import json
import threading

import requests

from ..config import data_config
from ..util import get_url


def get_c3_config(domain):
    for c3_config in data_config["open-c3-list"]:
        if c3_config["addr"] == domain:
            return c3_config

    return None


def get_userinfo(token):
    """
    查询用户信息
    Args:
        token: token
    """
    threads = []
    lock = threading.Lock()

    userinfo = None
    headers = {"token": token}

    def worker(config):
        url = get_url(config["addr"], "/api/connector/to3part/v1/user/userinfo")
        response = requests.get(url, headers=headers)
        data = json.loads(response.text)
        if "stat" in data and not data["stat"]:
            return

        nonlocal userinfo

        with lock:
            userinfo = data

    for c3_config in data_config["open-c3-list"]:
        t = threading.Thread(target=worker, args=(c3_config,))
        t.daemon = True
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

    return userinfo


def get_department(email):
    """
    查询用户部门信息
    Args:
        email: email
    """
    params = {"email": email}

    user_contact = cache.get_user_contact(email)
    if user_contact is None:
        return None

    c3_config = get_c3_config(user_contact["c3_addr"])
    if c3_config is None:
        raise RuntimeError(f"无法通过 {user_contact['c3_addr']} 找到对应c3的地址")

    headers = {
        "appname": c3_config["appname"],
        "appkey": c3_config["appkey"],
    }

    url = get_url(user_contact["c3_addr"], "/api/connector/to3part/v1/user/department")
    response = requests.get(url, headers=headers, params=params)

    return json.loads(response.text)


def get_user_contact_list(domain, appname, appkey):
    """
    查询地址簿列表
    Args:
        domain:     c3域名
        appname:    appname
        appkey:     appkey
    """
    headers = {
        "appname": appname,
        "appkey": appkey,
    }

    url = get_url(domain, "/api/connector/useraddr")
    response = requests.get(url, headers=headers)
    return json.loads(response.text)


def get_endpoint_list():
    """
    获取配置的c3端点列表
    """
    data = []
    for c3_config in data_config["open-c3-list"]:
        data.append(c3_config["addr"])

    return data


class Cache:
    """
    缓存从所有c3查询到
    """

    def __init__(self):
        self.lock = threading.Lock()
        # email -> user_contact
        self.cache = {}

    def update(self):
        data = {}

        for c3_config in data_config["open-c3-list"]:
            resp = get_user_contact_list(
                c3_config["addr"],
                c3_config["appname"],
                c3_config["appkey"],
            )
            contact_list = resp["data"]

            for item in contact_list:
                item["c3_addr"] = c3_config["addr"]

                data[item["email"]] = item

        with self.lock:
            self.cache = data

    def get_user_contact(self, email):
        with self.lock:
            return self.cache[email] if email in self.cache else None


cache = Cache()
