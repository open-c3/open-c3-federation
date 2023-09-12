#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

import json
import threading
from abc import ABC, abstractmethod

import requests

from .approve_id import get_domain_by_approve_id, save_approve_id
from ..config import data_config
from ..util import get_url, call_api_from_all, call_api_from_one

"""
这里支持两种缓存。冷缓存和热缓存。冷缓存的数据自从程序启动后就不再刷新。热缓存的数据会被定期刷新

要创建冷缓存，请创建继承自 ColdCacheBase 的子类，并实现必要的方法
要创建热缓存，请创建继承自 HotCacheBase 的子类，并实现必要的方法
"""


class ColdCacheBase(ABC):
    """
    用于缓存指定类型数据的抽象类

    该类型的缓存不会被定期刷新
    """

    @abstractmethod
    def fetch_data(self):
        """
        获取该资源类型的所有数据

        该方法返回的数据将直接作为缓存数据，请仔细处理数据结构
        """
        pass


class C3Endpoints(ColdCacheBase, ABC):
    """
    缓存openc3端点信息
    """

    def fetch_data(self):
        data = {}
        for c3_config in data_config["open-c3-list"]:
            data[c3_config["domain"]] = c3_config
            data[c3_config["name"]] = c3_config

        return data


# -------------------------------------------


class HotCacheBase(ABC):
    """
    用于缓存指定类型数据的抽象类

    该类型的缓存会被定期刷新
    """

    @abstractmethod
    def fetch_data(self):
        """
        获取该资源类型的所有数据

        该方法返回的数据将直接作为缓存数据，请仔细处理数据结构
        """
        pass


class UserContacts(HotCacheBase, ABC):
    """
    缓存地址簿数据
    """

    def fetch_data(self):
        response_list, c3_domain_list = get_user_contact_list()

        data = {}

        for i in range(len(response_list)):
            resp = json.loads(response_list[i].text)
            contact_list = resp["data"]

            for item in contact_list:
                item["domain"] = c3_domain_list[i]

                data[item["email"]] = item

        return data


class Cache:
    """
    缓存从c3查询到的相关数据
    """

    def __init__(self):
        self.lock = threading.Lock()
        self.cold_cache = self._get_cold_cache()
        self.hot_cache = {}

    def _get_cold_cache(self):
        data = {}

        for cache_proxy in ColdCacheBase.__subclasses__():
            ins = cache_proxy()
            data[ins.__class__.__name__] = cache_proxy().fetch_data()

        return data

    def update_hot_cache(self):
        data = {}

        for cache_proxy in HotCacheBase.__subclasses__():
            ins = cache_proxy()

            name = ins.__class__.__name__
            d = cache_proxy().fetch_data()

            data[name] = d

        with self.lock:
            self.hot_cache = data

    def get_user_contact(self, email):
        """
        根据用户邮箱查询缓存的地址簿数据
        """
        with self.lock:
            identifier = UserContacts.__name__
            return (
                self.hot_cache[identifier][email]
                if email in self.hot_cache[identifier]
                else None
            )

    def get_c3_config(self, identifier):
        return self.cold_cache[C3Endpoints.__name__][identifier]


cache = Cache()


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
        url = get_url(config["domain"], "/api/connector/to3part/v1/user/userinfo")
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

    resp = call_api_from_one(
        user_contact["domain"],
        "/api/connector/to3part/v1/user/department",
        "get",
        params=params,
    )
    return json.loads(resp.text)["data"]


def get_user_contact_list():
    """
    查询地址簿列表
    """
    return call_api_from_all("/api/connector/useraddr", "get")


def get_endpoint_list():
    """
    获取配置的c3端点列表
    """
    data = []
    for c3_config in data_config["open-c3-list"]:
        item = {
            "domain": c3_config["domain"],
            "name": c3_config["name"],
        }
        if "callback" in c3_config:
            item["callback"] = c3_config["callback"]
        data.append(item)

    return data


def create_approval(user_id, special_approver, title, apply_note):
    """
    发起审批

    Args:
        user_id: 工单发起人
        special_approver: 审批人
        title: 审批标题
        apply_note: 审批内容
    """

    special_approver_contact = cache.get_user_contact(special_approver)

    data = {
        "user_id": user_id,
        "special_approver": special_approver,
        "title": title,
        "apply_note": apply_note,
    }

    resp = call_api_from_one(
        special_approver_contact["domain"],
        "/api/job/to3part/v1/approval",
        "post",
        data=data,
    )
    result = json.loads(resp.text)["data"]

    # 保存单号和域名的对应关系
    save_approve_id(result["djbh"], special_approver_contact["domain"])

    return result


def get_approval(djbh):
    """
    查询审批结果

    Args:
        djbh: 工单编号
    """
    domain = get_domain_by_approve_id(djbh)

    params = {"djbh": djbh}

    resp = call_api_from_one(
        domain, "/api/job/to3part/v1/approval", "get", params=params
    )
    return json.loads(resp.text)["data"]
