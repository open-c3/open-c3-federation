#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-
import json
from abc import ABC

from app.config import data_config
from app.util import call_api_from_all
from .cache_base import cache, HotCacheBase, ColdCacheBase


def get_user_contact_list():
    """
    查询地址簿列表
    """
    return call_api_from_all("/api/connector/useraddr", "get")


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


def get_user_contact(email):
    """
    根据用户邮箱查询缓存的地址簿数据
    """
    with cache.lock:
        identifier = UserContacts.__name__
        return (
            cache.hot_cache[identifier][email]
            if email in cache.hot_cache[identifier]
            else None
        )


def get_c3_config(self, identifier):
    return self.cold_cache[C3Endpoints.__name__][identifier]
