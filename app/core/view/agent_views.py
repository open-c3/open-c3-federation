#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from flasgger import swag_from
from flask import Blueprint
from flask import request

from app.core.api.agent import *
from app.core.response import *

agent_view = Blueprint("agent", __name__)


@agent_view.route("/monitor/alert/0", methods=["GET"])
@swag_from(
    {
        "tags": ["agent"],
        "description": "该接口用于获取当前告警列表",
        "responses": {
            200: {
                "description": "Successful response",
                "schema": {
                    "type": "object",
                    "properties": {
                        "code": {
                            "type": "integer",
                            "example": 200,
                            "description": "状态码",
                        },
                        "data": {
                            "type": "array",
                        },
                    },
                },
            }
        },
    }
)
def get_alert_list_view():
    try:
        data = get_alert_list()
        return success_response(data)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")


@agent_view.route("/monitor/alert/tottbind/0", methods=["GET"])
@swag_from(
    {
        "tags": ["agent"],
        "description": "获取当前告警列表每个告警绑定的tt列表",
        "responses": {
            200: {
                "description": "Successful response",
                "schema": {
                    "type": "object",
                    "properties": {
                        "code": {
                            "type": "integer",
                            "example": 200,
                            "description": "状态码",
                        },
                        "data": {
                            "type": "array",
                        },
                    },
                },
            }
        },
    }
)
def get_bindtt_list_view():
    try:
        data = get_bindtt_list()
        return success_response(data)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")


@agent_view.route("/monitor/ack/deal/info", methods=["GET"])
@swag_from(
    {
        "tags": ["agent"],
        "description": "获取告警认领列表",
        "responses": {
            200: {
                "description": "Successful response",
                "schema": {
                    "type": "object",
                    "properties": {
                        "code": {
                            "type": "integer",
                            "example": 200,
                            "description": "状态码",
                        },
                        "data": {
                            "type": "array",
                        },
                    },
                },
            }
        },
    }
)
def get_ack_deal_list_view():
    try:
        data = get_ack_deal_list()
        return success_response(data)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")


@agent_view.route("/monitor/ack/deal/info", methods=["POST"])
@swag_from(
    {
        "tags": ["agent"],
        "description": "认领告警",
        "responses": {
            200: {
                "description": "Successful response",
                "schema": {
                    "type": "object",
                    "properties": {
                        "code": {
                            "type": "integer",
                            "example": 200,
                            "description": "状态码",
                        },
                        "data": {
                            "type": "array",
                        },
                    },
                },
            }
        },
    }
)
def ack_alert_view():
    try:
        json_data = request.get_json()

        if "data" not in json_data:
            return error_response_400("缺少必传参数data")

        for c3_name, uuids in json_data["data"].items():
            ack_alert(c3_name, uuids)
        return success_response("成功认领!")
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")


@agent_view.route("/monitor/alert/tott/0", methods=["POST"])
@swag_from(
    {
        "tags": ["agent"],
        "description": "告警转工单",
        "responses": {
            200: {
                "description": "Successful response",
                "schema": {
                    "type": "object",
                    "properties": {
                        "code": {
                            "type": "integer",
                            "example": 200,
                            "description": "状态码",
                        },
                        "data": {
                            "type": "object",
                        },
                    },
                },
            },
            400: {
                "description": "Bad Request. Failed to get the data due to invalid input.",
            },
        },
    }
)
def convert_alert_to_tt_view():
    try:
        c3_name = request.args.get("c3_name")
        request_data = request.data

        if not c3_name:
            return error_response_400("请传递c3_name参数")

        convert_alert_to_tt(c3_name, json.loads(request_data.decode("utf-8")))
        return success_response("成功转工单!")
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")
