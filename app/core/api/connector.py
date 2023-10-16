#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from app.util import *
from ..cache.cache import *


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

    logger.debug(f"get_userinfo. request. token: {token}")

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

    logger.debug(
        f"get_userinfo. response. token: {token}, response: {json.dumps(userinfo)}"
    )

    return userinfo


def get_userleader(email):
    """
    查询用户领导列表 (索引越大，领导级别越高)
    """
    params = {"user": email}

    user_contact = get_user_contact(email)
    if user_contact is None:
        return None

    logger.debug(f"get_userleader. request. email: {email}")

    resp = call_api_from_one(
        user_contact["domain"],
        "/api/ci/c3mc/base/userleader",
        "get",
        params=params,
    )

    logger.debug(f"get_userleader. response. email: {email}, response: {resp.text}")

    data = json.loads(resp.text)["data"]

    sorted_keys = sorted(data.keys())

    result = []

    for key in sorted_keys:
        result.append(data[key])

    return result


def get_department(email):
    """
    查询用户部门信息
    Args:
        email: email
    """
    params = {"email": email}

    user_contact = get_user_contact(email)
    if user_contact is None:
        return None

    logger.debug(f"get_department. request. email: {email}")

    resp = call_api_from_one(
        user_contact["domain"],
        "/api/connector/to3part/v1/user/department",
        "get",
        params=params,
    )

    logger.debug(f"get_department. response. email: {email}, response: {resp.text}")

    return json.loads(resp.text)["data"]


def sso_logout():
    """
    退出登录
    """
    for c3_domain, c3_config in get_c3_config_dict().items():
        params = {
            "siteaddr": c3_domain,
        }
        call_api_from_one(
            c3_domain,
            "/api/connector/connectorx/approve/ssologout",
            "get",
            params=params,
        )
