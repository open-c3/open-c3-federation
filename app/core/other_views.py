#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from flasgger import swag_from
from flask import Blueprint, current_app
from werkzeug.local import LocalProxy

from .api import get_endpoint_list
from .response import success_response

other_view = Blueprint("other", __name__)
logger = LocalProxy(lambda: current_app.logger)


@other_view.route("/endpoints", methods=["GET"])
@swag_from(
    {
        "tags": ["other"],
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
    data = get_endpoint_list()
    return success_response(data)
