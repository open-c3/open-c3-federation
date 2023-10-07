#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from flasgger import swag_from
from flask import Blueprint

from app.core.api.federation import *
from app.core.response import *

federation_view = Blueprint("federation", __name__)


@federation_view.route("/endpoints", methods=["GET"])
@swag_from(
    {
        "tags": ["federation"],
        "description": "获取c3端点列表",
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
                            "items": {
                                "type": "object",
                                "properties": {
                                    "domain": {
                                        "type": "string",
                                        "example": "http://open-c3.abc.com",
                                        "description": "域名",
                                    },
                                    "name": {
                                        "type": "string",
                                        "example": "open-c3",
                                        "description": "名称",
                                    },
                                },
                            },
                        },
                    },
                },
            }
        },
    }
)
def get_endpoint_list_view():
    try:
        data = get_endpoint_list()
        return success_response(data)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")
