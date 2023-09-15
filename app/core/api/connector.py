#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

import json
import threading

import requests

from app.config import data_config
from app.util import get_url, call_api_from_one
from ..cache.cache_api import get_user_contact


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

    user_contact = get_user_contact(email)
    if user_contact is None:
        return None

    resp = call_api_from_one(
        user_contact["domain"],
        "/api/connector/to3part/v1/user/department",
        "get",
        params=params,
    )
    return json.loads(resp.text)["data"]
