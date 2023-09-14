#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

import threading
from abc import ABC, abstractmethod

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


cache = Cache()
