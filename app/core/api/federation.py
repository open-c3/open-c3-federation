#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from ..cache.cache import *


def get_endpoint_list():
    """
    获取配置的c3端点列表
    """
    data = []
    for c3_domain, c3_config in get_c3_config_dict().items():
        item = {
            "domain": c3_config["domain"],
            "name": c3_config["name"],
        }
        if "callback" in c3_config:
            item["callback"] = c3_config["callback"]
        data.append(item)

    logger.debug(f"get_endpoint_list. data: {json.dumps(data)}")

    return data
