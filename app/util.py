#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

import concurrent.futures
from urllib.parse import urljoin

import requests

from .config import data_config


def get_url(domain, api_path):
    """
    将域名和api路径拼成完整的请求地址
    Args:
        domain: 域名
        api_path: api路径

    Returns:
        完整api地址
    """
    return str(urljoin(domain, api_path))


def _call_api(
    domain, api_path, http_method, header=None, params=None, data=None, cookies=None
):
    if header is None:
        header = {}

    for c3_config in data_config["open-c3-list"]:
        if c3_config["domain"] != domain:
            continue

        header.update({"appname": c3_config["appname"], "appkey": c3_config["appkey"]})
        url = get_url(c3_config["domain"], api_path)

        method = getattr(requests, http_method.lower(), None)
        if not method:
            raise ValueError(f"不支持该http方法: {http_method}")

        response = method(
            url, headers=header, params=params, data=data, cookies=cookies
        )

        return response, c3_config["domain"]


def call_api_from_all(
    api_path, http_method, header=None, params=None, data=None, cookies=None
):
    """
    指定api路径，然后依次调用所有c3
    """
    responses = []
    domains = []

    for c3_config in data_config["open-c3-list"]:
        response, domain = _call_api(
            c3_config["domain"], api_path, http_method, header, params, data, cookies
        )
        responses.append(response)
        domains.append(domain)

    return responses, domains


def call_api_from_one(
    domain, api_path, http_method, header=None, params=None, data=None, cookies=None
):
    """
    指定域名，调用指定c3
    """
    response, _ = _call_api(
        domain, api_path, http_method, header, params, data, cookies
    )
    return response


def concurrent_run_funcs(functions_list):
    """
    并发运行每一个函数，将所有函数返回值作为数组返回
    """
    return_values = []

    with concurrent.futures.ThreadPoolExecutor(
        max_workers=len(functions_list)
    ) as executor:
        futures = [executor.submit(func) for func in functions_list]

        for future in concurrent.futures.as_completed(futures):
            try:
                result = future.result()
                return_values.append(result)
            except Exception as e:
                raise RuntimeError("在主线程中捕获到了线程异常") from e

    return return_values


def merge_dict_list(dict_list):
    """
    合并字典列表
    """
    merged_dict = {}

    for d in dict_list:
        merged_dict.update(d)

    return merged_dict


def merge_list_of_list(data_list):
    """
    将二维列表展开为一维
    """
    return [item for subList in data_list for item in subList]
