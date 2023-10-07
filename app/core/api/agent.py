#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from app.util import *
from ..cache.cache import *


def get_alert_list():
    """
    获取当前告警列表
    """

    def worker(name, domain):
        result = []

        params = {"siteaddr": domain}

        resp = call_api_from_one(
            domain,
            "/api/agent/monitor/alert/0",
            "get",
            params=params,
        )
        data = json.loads(resp.text)

        if not data["stat"]:
            logger.debug(f"get_alert_list. domain: {domain}, 获取数据出错: {resp.text}")

        logger.debug(
            f"get_alert_list_v2. domain: {domain}, len(data): {len(data['data'])}"
        )

        for item in data["data"]:
            item["c3_name"] = name
            item["c3_domain"] = domain

            result.append(item)

        return result

    worker_list = []

    for c3_domain, c3_config in get_c3_config_dict().items():
        worker_list.append(
            lambda name=c3_config["name"], domain=c3_domain: worker(name, domain)
        )

    data_list = concurrent_run_funcs(worker_list)
    return merge_list_of_list(data_list)


def get_bindtt_list():
    """
    获取当前告警列表每个告警绑定的tt列表
    """

    def worker(domain):
        resp = call_api_from_one(
            domain,
            "/api/agent/monitor/alert/tottbind/0",
            "get",
        )

        data = json.loads(resp.text)

        if not data["stat"]:
            logger.debug(f"get_bindtt_list. domain: {domain}, 获取数据出错: {resp.text}")

        logger.debug(
            f"get_bindtt_list. domain: {domain}, len(data): {len(data['data'])}"
        )

        return data["data"]

    worker_list = []
    for c3_domain, c3_config in get_c3_config_dict().items():
        worker_list.append(lambda domain=c3_domain: worker(domain))

    data_list = concurrent_run_funcs(worker_list)
    return merge_dict_list(data_list)


def get_ack_deal_list():
    """
    获取告警认领列表
    """

    def worker(domain):
        resp = call_api_from_one(
            domain,
            "/api/agent/monitor/ack/deal/info",
            "get",
        )

        data = json.loads(resp.text)

        if not data["stat"]:
            logger.debug(f"get_ack_deal_list. domain: {domain}, 获取数据出错: {resp.text}")

        logger.debug(
            f"get_ack_deal_list. domain: {domain}, len(data): {len(data['data'])}"
        )
        return data["data"]

    worker_list = []
    for c3_domain, c3_config in get_c3_config_dict().items():
        worker_list.append(lambda domain=c3_domain: worker(domain))

    data_list = concurrent_run_funcs(worker_list)
    return merge_dict_list(data_list)


def ack_alert(c3_name, alert_uuid):
    """
    认领指定告警
    Args:
        c3_name: c3名称
        alert_uuid: 告警uuid
    """
    resp = call_api_from_one(
        get_c3_config_by_name(c3_name)["domain"],
        "/api/agent/monitor/ack/deal/info",
        "post",
        data={"uuid": alert_uuid},
    )
    if not json.loads(resp.text)["stat"]:
        msg = f"认领ack出错, resp: {resp.text}"
        logger.exception(msg)
        raise RuntimeError(msg)


def convert_alert_to_tt(c3_name, data):
    """
    告警转工单
    """
    c3_config = get_c3_config_by_name(c3_name)
    c3_domain = c3_config["domain"]

    resp = call_api_from_one(
        c3_domain,
        "/api/agent/monitor/alert/tott/0",
        "post",
        header={"Content-Type": "application/json"},
        data=json.dumps(data),
    )

    if not json.loads(resp.text)["stat"]:
        msg = f"告警转工单出错, resp: {resp.text}"
        logger.exception(msg)
        raise RuntimeError(msg)
