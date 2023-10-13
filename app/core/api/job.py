#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from app.core.approve_id import *
from app.util import *
from ..cache.cache import *


def create_approval(user_id, special_approver, title, apply_note):
    """
    发起审批

    Args:
        user_id: 工单发起人
        special_approver: 审批人
        title: 审批标题
        apply_note: 审批内容
    """

    special_approver_contact = get_user_contact(special_approver)

    # 如果不是同一个邮箱类型，则使用sys@app作为审批发起人，避免出现跨公司审批错误
    if not compare_emails(user_id, special_approver):
        user_id = "sys@app"

    data = {
        "user_id": user_id,
        "special_approver": special_approver,
        "title": title,
        "apply_note": apply_note,
    }

    logger.debug(
        f"create_approval. request. special_approver_contact: {json.dumps(special_approver_contact)}, data: {json.dumps(data)}"
    )

    resp = call_api_from_one(
        special_approver_contact["domain"],
        "/api/job/to3part/v1/approval",
        "post",
        data=data,
    )

    logger.debug(
        f"create_approval. response. special_approver_contact: {json.dumps(special_approver_contact)}, data: {json.dumps(data)}, response: {resp.text}"
    )

    result = json.loads(resp.text)["data"]

    # 保存单号和域名的对应关系
    save_approve_id(result["djbh"], special_approver_contact["domain"])

    return result


def get_approval(djbh):
    """
    查询审批结果

    Args:
        djbh: 工单编号
    """
    domain = get_domain_by_approve_id(djbh)

    if not domain:
        raise RuntimeError("无法找到指定工单对应的c3域名")

    params = {"djbh": djbh}

    resp = call_api_from_one(
        domain, "/api/job/to3part/v1/approval", "get", params=params
    )

    logger.debug(f"get_approval. response. djbh: {djbh}, response: {resp.text}")

    return json.loads(resp.text)["data"]
