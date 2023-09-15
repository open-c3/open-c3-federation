#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

import json

from app.core.approve_id import get_domain_by_approve_id, save_approve_id
from app.util import call_api_from_one
from ..cache.cache_api import get_user_contact


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

    data = {
        "user_id": user_id,
        "special_approver": special_approver,
        "title": title,
        "apply_note": apply_note,
    }

    resp = call_api_from_one(
        special_approver_contact["domain"],
        "/api/job/to3part/v1/approval",
        "post",
        data=data,
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

    params = {"djbh": djbh}

    resp = call_api_from_one(
        domain, "/api/job/to3part/v1/approval", "get", params=params
    )
    return json.loads(resp.text)["data"]
