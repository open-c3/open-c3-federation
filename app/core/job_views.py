#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from flasgger import swag_from
from flask import Blueprint, current_app
from flask import request
from werkzeug.local import LocalProxy

from .api import create_approval, get_approval
from .response import success_response

job_view = Blueprint("job", __name__)
logger = LocalProxy(lambda: current_app.logger)


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
    data = request.json
    user_id = data.get("user_id")
    special_approver = data.get("special_approver")
    title = data.get("title")
    apply_note = data.get("apply_note")

    data = create_approval(user_id, special_approver, title, apply_note)

    return success_response(data)


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
                        "data": {
                            "type": "object",
                            "properties": {
                                "data": {
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
    user_id = request.args.get("user_id", "")
    djbh = request.args.get("djbh", "")

    data = get_approval(user_id, djbh)

    return success_response(data)
