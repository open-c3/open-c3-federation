#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from flasgger import swag_from
from flask import Blueprint, current_app, request
from werkzeug.local import LocalProxy

from app.core.api import get_userinfo, get_department
from app.core.response import error_response_400, success_response

connector_view = Blueprint("connector", __name__)
logger = LocalProxy(lambda: current_app.logger)


@connector_view.route("/to3part/v1/user/userinfo", methods=["GET"])
@swag_from(
    {
        "tags": ["connector"],
        "parameters": [
            {
                "name": "token",
                "in": "header",
                "type": "string",
                "required": True,
                "description": "用户的token",
            }
        ],
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
                            "properties": {
                                "admin": {
                                    "type": "string",
                                    "example": "1",
                                    "description": "是否为管理员",
                                },
                                "company": {
                                    "type": "string",
                                    "example": "ops",
                                    "description": "公司名称",
                                },
                                "email": {
                                    "type": "string",
                                    "example": "wupeng@cmcm.com",
                                    "description": "用户邮箱",
                                },
                                "name": {
                                    "type": "string",
                                    "example": "WUPENG",
                                    "description": "用户名",
                                },
                                "showconnector": {
                                    "type": "string",
                                    "example": "1",
                                    "description": "是否显示连接器",
                                },
                            },
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
def get_userinfo_view():
    token = request.headers.get("token")

    if not token:
        return error_response_400("请在header中传递token")

    data = get_userinfo(token)
    if data is None:
        return error_response_400("无法根据指定token获取到用户信息")

    return success_response(data)


@connector_view.route("/to3part/v1/user/department", methods=["GET"])
@swag_from(
    {
        "tags": ["connector"],
        "parameters": [
            {
                "name": "token",
                "in": "header",
                "type": "string",
                "required": True,
                "description": "用户的token",
            }
        ],
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
                            "properties": {
                                "accountId": {
                                    "type": "string",
                                    "example": "zhangsan@email.com",
                                    "description": "账户ID",
                                },
                                "accountName": {
                                    "type": "string",
                                    "example": "张三",
                                    "description": "账户名称",
                                },
                                "mobile": {
                                    "type": "string",
                                    "example": "18788888888",
                                    "description": "手机号",
                                },
                                "oneDeptName": {
                                    "type": "string",
                                    "example": "云平台",
                                    "description": "一级部门名称",
                                },
                                "oneLeaderId": {
                                    "type": "string",
                                    "example": "lisi@email.com",
                                    "description": "一级领导ID",
                                },
                                "sybDeptName": {
                                    "type": "string",
                                    "example": "运维部",
                                    "description": "子部门名称",
                                },
                                "sybLeaderId": {
                                    "type": "string",
                                    "example": "wangmazi@email.com",
                                    "description": "子部门领导ID",
                                },
                                "twoDeptName": {
                                    "type": "string",
                                    "example": "工具部",
                                    "description": "二级部门名称",
                                },
                                "twoLeaderId": {
                                    "type": "string",
                                    "example": "kongzi@email.com",
                                    "description": "二级领导ID",
                                },
                            },
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
def get_department_view():
    token = request.headers.get("token")

    if not token:
        return error_response_400("请传递token")

    user_info = get_userinfo(token)
    if user_info is None:
        return error_response_400("无法根据指定token获取到用户信息")

    department_info = get_department(user_info["email"])
    if department_info is None:
        return error_response_400("无法根据指定邮箱获取到部门信息, 请确认邮箱是否填写正确")

    return success_response(department_info)
