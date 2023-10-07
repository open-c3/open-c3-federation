#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from app.util import *
from ..cache.cache import *


def get_base_config():
    """
    获取tt基础配置信息
    """

    def worker(name, domain):
        result = {}

        resp = call_api_from_one(
            c3_domain,
            "/api/tt/public/base/all",
            "get",
        )

        data = json.loads(resp.text)

        if "data" not in data:
            logger.debug(f"get_base_config. domain: {domain}, 获取数据出错: {resp.text}")

        result[name] = data["data"]
        return result

    worker_list = []
    for c3_domain, c3_config in get_c3_config_dict().items():
        worker_list.append(
            lambda name=c3_config["name"], domain=c3_domain: worker(name, domain)
        )

    data_list = concurrent_run_funcs(worker_list)
    return merge_dict_list(data_list)


def search_tt_list(c3_name, request_body):
    """
    搜索tt

    这里将请求转发到了tt工单的/api/tt/public/search/list接口
    具体参数介绍，请参考该接口的规范
    """

    def get_tt_list(name, domain):
        resp = call_api_from_one(
            domain,
            "/api/tt/public/search/list",
            "post",
            data=json.dumps(request_body),
        )

        tt_list = json.loads(resp.text)["data"]

        for i in range(len(tt_list)):
            tt_list[i]["c3_name"] = name
            tt_list[i]["c3_domain"] = domain

        return tt_list

    if c3_name:
        data_list = get_tt_list(c3_name)
    else:
        worker_list = []

        for c3_domain, c3_config in get_c3_config_dict().items():
            worker_list.append(
                lambda name=c3_config["name"], domain=c3_domain: get_tt_list(
                    name, domain
                )
            )

        data_list = concurrent_run_funcs(worker_list)
        data_list = merge_list_of_list(data_list)

    return sorted(data_list, key=lambda x: (x["created_at"]), reverse=True)
