#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from flasgger import swag_from
from flask import Blueprint, request

from app.core.api.connector import *
from app.core.response import *

connector_view = Blueprint("connector", __name__)


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
    try:
        token = request.headers.get("token")

        logger.debug(f"get_userinfo_view. token: {token}")

        if not token:
            return error_response_400("请在header中传递token")

        data = get_userinfo(token)
        if data is None:
            return error_response_400("无法根据指定token获取到用户信息")

        logger.debug(f"get_userinfo_view. token: {token}, userinfo: {json.dumps(data)}")

        return success_response(data)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")


@connector_view.route("/connectorx/sso/userinfo", methods=["GET"])
@swag_from(
    {
        "tags": ["connector"],
        "description": "获取用户信息",
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
def get_userinfo_view_v2():
    try:
        logger.debug(f"get_userinfo_view_v2. cookies = {json.dumps(request.cookies)}")

        token = ""
        if "u" in request.cookies:
            token = request.cookies.get("u")
        elif "sid" in request.cookies:
            token = request.cookies.get("sid")

        if not token:
            return error_response_need_login("没有传递有效cookie, 请重新登录")

        logger.debug(f"get_userinfo_view_v2. token: {token}")

        data = get_userinfo(token)
        if data is None:
            return error_response_need_login("无法根据指定token获取到用户信息")

        logger.debug(f"get_userinfo_view. token: {token}, userinfo: {json.dumps(data)}")

        return success_response(data)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")


@connector_view.route("/connectorx/sso/userinfo/department", methods=["GET"])
@swag_from(
    {
        "tags": ["connector"],
        "description": "获取用户部门信息",
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
    try:
        token = ""
        if "u" in request.cookies:
            token = request.cookies.get("u")
        elif "sid" in request.cookies:
            token = request.cookies.get("sid")

        if not token:
            return error_response_need_login("没有传递有效cookie, 请重新登录")

        logger.debug(f"get_department_view. token: {token}")

        user_info = get_userinfo(token)
        if user_info is None:
            return error_response_need_login("无法根据指定token获取到用户信息")

        department_info = get_department(user_info["email"])
        if department_info is None:
            return error_response_need_login("无法根据指定邮箱获取到部门信息, 请确认邮箱是否填写正确")

        logger.debug(
            f"get_department_view. token: {token}, department_info: {json.dumps(department_info)}"
        )

        return success_response(department_info)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")


@connector_view.route("/connectorx/sso/userinfo/department_v2", methods=["GET"])
@swag_from(
    {
        "tags": ["connector"],
        "description": "获取用户部门信息",
        "parameters": [
            {
                "name": "email",
                "in": "query",
                "type": "string",
                "required": True,
                "description": "用户邮箱地址",
            },
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
def get_department_view_v2():
    try:
        email = request.args.get("email")

        if not email:
            return error_response_need_login("请传递email参数")

        department_info = get_department(email)
        if department_info is None:
            return error_response_need_login("无法根据指定邮箱获取到部门信息, 请确认邮箱是否填写正确")

        logger.debug(
            f"get_department_view. token: {email}, department_info: {json.dumps(department_info)}"
        )

        return success_response(department_info)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")


@connector_view.route("/connectorx/approve/ssologout", methods=["GET"])
@swag_from(
    {
        "tags": ["connector"],
        "description": "退出登录",
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
                    },
                },
            },
            400: {
                "description": "Bad Request. Failed to get the data due to invalid input.",
            },
        },
    }
)
def sso_logout_view():
    try:
        sso_logout()
        return success_response("成功退出登录!")
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")


@connector_view.route("/base/userleader", methods=["GET"])
@swag_from(
    {
        "tags": ["connector"],
        "description": "获取用户领导",
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
                    },
                },
            },
        },
    }
)
def get_userleader_view():
    try:
        token = ""
        if "u" in request.cookies:
            token = request.cookies.get("u")
        elif "sid" in request.cookies:
            token = request.cookies.get("sid")

        if not token:
            return error_response_need_login("没有传递有效cookie, 请重新登录")

        logger.debug(f"get_department_view. token: {token}")

        user_info = get_userinfo(token)
        if user_info is None:
            return error_response_need_login("无法根据指定token获取到用户信息")

        user_leader_list = get_userleader(user_info["email"])
        if not user_leader_list:
            return error_response_need_login("无法根据指定邮箱获取到用户领导, 请确认邮箱是否填写正确")

        logger.debug(
            f"get_userleader_view. token: {token}, 用户领导列表: {json.dumps(user_leader_list)}"
        )

        return success_response(user_leader_list)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")


@connector_view.route("/base/userleader_v2", methods=["GET"])
@swag_from(
    {
        "tags": ["connector"],
        "description": "获取用户领导",
        "parameters": [
            {
                "name": "email",
                "in": "query",
                "type": "string",
                "required": True,
                "description": "用户邮箱地址",
            },
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
                    },
                },
            },
        },
    }
)
def get_userleader_view_v2():
    try:
        email = request.args.get("email")

        if not email:
            return error_response_need_login("请传递email参数")

        user_leader_list = get_userleader(email)
        if not user_leader_list:
            return error_response_need_login("无法根据指定邮箱获取到用户领导, 请确认邮箱是否填写正确")

        logger.debug(
            f"get_userleader_view. token: {email}, 用户领导列表: {json.dumps(user_leader_list)}"
        )

        return success_response(user_leader_list)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")
