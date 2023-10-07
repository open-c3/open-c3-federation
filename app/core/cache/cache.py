#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

import json
import threading
from abc import ABC
from abc import abstractmethod

from loguru import logger

from app.config import data_config
from app.util import call_api_from_all

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
            try:
                resp = json.loads(response_list[i].text)
            except Exception as e:
                logger.exception(f"UserContacts.fetch_data. 获取数据出错: {str(e)}")
                continue

            contact_list = resp["data"]

            for item in contact_list:
                item["domain"] = c3_domain_list[i]

                data[item["email"]] = item

        logger.debug(f"UserContacts.fetch_data. len(data): {len(data)}")

        return data


class C3Endpoints(ColdCacheBase, ABC):
    """
    缓存openc3端点信息
    """

    def fetch_data(self):
        data = {}
        for c3_config in data_config["open-c3-list"]:
            data[c3_config["domain"]] = c3_config

        logger.debug(f"C3Endpoints.fetch_data. len(data): {len(data)}")

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

        logger.debug(f"Cache._get_cold_cache. len(data): {len(data)}")

        return data

    def update_hot_cache(self):
        data = {}

        for cache_proxy in HotCacheBase.__subclasses__():
            ins = cache_proxy()

            name = ins.__class__.__name__
            d = cache_proxy().fetch_data()

            data[name] = d

        with self.lock:
            logger.debug(f"Cache.update_hot_cache. len(data): {len(data)}")
            self.hot_cache = data


cache = Cache()


def get_user_contact(email):
    """
    根据用户邮箱查询缓存的地址簿数据
    """
    with cache.lock:
        identifier = UserContacts.__name__

        logger.debug(f"get_user_contact. len(cache.hot_cache): {len(cache.hot_cache)}")

        return (
            cache.hot_cache[identifier][email]
            if email in cache.hot_cache[identifier]
            else None
        )


def get_c3_config_by_domain(c3_domain):
    return cache.cold_cache[C3Endpoints.__name__][c3_domain]


def get_c3_config_by_name(c3_name):
    for c3_domain, c3_config in cache.cold_cache[C3Endpoints.__name__].items():
        if c3_config["name"] == c3_name:
            return c3_config
    raise RuntimeError(f"无法查询到指定的c3配置: {c3_name}")


def get_c3_config_dict():
    return cache.cold_cache[C3Endpoints.__name__]
