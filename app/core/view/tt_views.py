#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from flasgger import swag_from
from flask import Blueprint
from flask import request

from app.core.api.tt import *
from app.core.response import *

tt_view = Blueprint("tt", __name__)


@tt_view.route("/public/base/all", methods=["GET"])
@swag_from(
    {
        "tags": ["tt"],
        "description": "获取tt基础配置信息",
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
def get_base_config_view():
    try:
        data = get_base_config()

        return success_response(data)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")


@tt_view.route("/public/search/list", methods=["POST"])
@swag_from(
    {
        "tags": ["tt"],
        "description": "搜索tt",
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
def search_tt_list_view():
    try:
        data = request.json
        c3_name = data.get("c3_name")

        data = search_tt_list(c3_name, data)
        return success_response(data)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")
