#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from flasgger import Swagger
from flask import request
from loguru import logger

from app import create_app, data_config

app = create_app()
swagger = Swagger(app)


@app.before_request
def log_request_info():
    logger.info(f"Request: {request.method} {request.url} from {request.remote_addr}")
    logger.info(f"Headers: {request.headers}")

    # 检查请求的 Content-Type 是否为 application/json
    if request.content_type == "application/json":
        try:
            json_data = request.json
            logger.info(f"JSON Data: {json_data}")
        except Exception as e:
            logger.error(f"Failed to parse JSON data: {e}")

    logger.info(f"Data: {request.data}")
    logger.info(f"Form Data: {request.form}")
    logger.info(f"Query Parameters: {request.args}")


# 日志级别
#
# 日志级别由低到高如下:
#
# TRACE
# DEBUG
# INFO
# SUCCESS
# WARNING
# ERROR
# CRITICAL
# NO

log_dir = "./log"

logger.add(
    f"{log_dir}/app.log",  # 日志文件路径
    rotation="1 week",  # 自动rotating，这里设置为每周
    level=data_config["log_level"],  # 日志级别
    # format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {message}",  # 日志格式
    encoding="utf-8",  # 日志文件编码
    colorize=True,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green>  | {level: <8} | {message}",
    # 确保日志在多进程时正确记录
    enqueue=True,
    backtrace=True,
    diagnose=True,
)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=data_config["port"])
