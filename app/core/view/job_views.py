#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from flasgger import swag_from
from flask import Blueprint
from flask import request

from app.core.api.job import *
from app.core.response import *

job_view = Blueprint("job", __name__)


@job_view.route("/to3part/v1/approval", methods=["POST"])
@swag_from(
    {
        "tags": ["job"],
        "parameters": [
            {
                "name": "user_id",
                "in": "body",
                "type": "string",
                "required": True,
                "description": "用户邮箱",
            },
            {
                "name": "special_approver",
                "in": "body",
                "type": "string",
                "required": False,
                "description": "指定的审批人",
            },
            {
                "name": "title",
                "in": "body",
                "type": "string",
                "required": True,
                "description": "审批信息的标题",
            },
            {
                "name": "apply_note",
                "in": "body",
                "type": "string",
                "required": True,
                "description": "审批信息的内容",
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
                                "djbh": {
                                    "type": "string",
                                    "example": "xxxxxxxxxx",
                                    "description": "oa工单标识",
                                },
                                "msg": {
                                    "type": "string",
                                    "example": "ok",
                                    "description": "操作结果状态",
                                },
                            },
                        },
                    },
                },
            }
        },
    }
)
def create_approval_view():
    try:
        data = request.json
        user_id = data.get("user_id")
        special_approver = data.get("special_approver")
        title = data.get("title")
        apply_note = data.get("apply_note")

        logger.debug(f"create_approval_view. request. data: {json.dumps(data)}")

        resp = create_approval(user_id, special_approver, title, apply_note)

        logger.debug(f"create_approval_view. response. data: {json.dumps(resp)}")

        return success_response(resp)
    except Exception as e:
        logger.exception(e)
        return error_response_500("服务端操作出现异常")


@job_view.route("/to3part/v1/approval", methods=["GET"])
@swag_from(
    {
        "tags": ["job"],
        "parameters": [
            {
                "name": "user_id",
                "in": "query",
                "type": "string",
                "required": True,
                "description": "用户邮箱",
            },
            {
                "name": "djbh",
                "in": "query",
                "type": "string",
                "required": True,
                "description": "工单标识",
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
                        "resp": {
                            "type": "object",
                            "properties": {
                                "resp": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "actionname": {
                                                "type": "string",
                                                "example": "待办",
                                                "description": "oa状态",
                                            }
                                        },
                                    },
                                },
                                "isend": {
                                    "type": "integer",
                                    "example": 0,
                                    "description": "oa流程是否已结束",
                                },
                            },
                        },
                    },
                },
            }
        },
    }
)
def get_approval_view():
    djbh = request.args.get("djbh", "")

    try:
        resp = get_approval(djbh)
        logger.debug(f"get_approval_view. djbh: {djbh}, resp: {json.dumps(resp)}")

        return success_response(resp)
    except Exception as e:
        if "无法找到指定工单对应的c3域名" in str(e):
            return error_response_500("无法找到指定工单对应的c3域名")

        return error_response_500("服务端操作出现异常")
