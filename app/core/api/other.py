#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from app.config import data_config


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
