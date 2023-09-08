#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from flask import jsonify


def success_response(data=None):
    return jsonify({"code": 200, "data": data or {}}), 200


def error_response_400(error_info):
    return jsonify({"code": 400, "info": error_info}), 400


def error_response_500(error_info):
    return jsonify({"code": 500, "info": error_info}), 500
