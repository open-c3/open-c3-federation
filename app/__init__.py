#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

import atexit
import threading
import time
from os import environ

from dotenv import load_dotenv
from flask import Flask, redirect, request
from flask_cors import CORS
from loguru import logger

from app.core.cache.cache import cache
from app.core.view.agent_views import agent_view
from app.core.view.connector_views import connector_view
from app.core.view.federation_views import federation_view
from app.core.view.job_views import job_view
from app.core.view.tt_views import tt_view
from .config import app_config, data_config


def create_app():
    # loading env vars from .env file
    load_dotenv()
    APPLICATION_ENV = get_environment()
    # logging.config.dictConfig(app_config[APPLICATION_ENV].LOGGING)
    app = Flask(app_config[APPLICATION_ENV].APP_NAME, static_url_path="/assets")
    CORS(app)
    app.config.from_object(app_config[APPLICATION_ENV])

    app.register_blueprint(connector_view, url_prefix="/api/connector")
    app.register_blueprint(job_view, url_prefix="/api/job")
    app.register_blueprint(agent_view, url_prefix="/api/agent")
    app.register_blueprint(tt_view, url_prefix="/api/tt")
    app.register_blueprint(federation_view, url_prefix="/api/federation")

    def background_task():
        while True:
            print("更新缓存...")
            cache.update_hot_cache()

            time.sleep(data_config["cache_seconds"])

    def stop_background_task():
        global background_thread
        background_thread.do_run = False

    background_thread = threading.Thread(target=background_task)
    background_thread.do_run = True
    background_thread.start()
    # 程序退出时停止缓存更新线程
    atexit.register(stop_background_task)

    def before_request_handler():
        requested_path = request.path

        logger.debug(f"before_request_handler. 请求路由: {requested_path}")

        if (
            requested_path.startswith("/assets/js")
            or requested_path.startswith("/assets/css")
            or requested_path.startswith("/assets/jpeg")
            or requested_path.startswith("/assets/svg")
        ):
            # 构建重定向路径
            redirect_path = "/assets" + requested_path

            logger.debug(f"before_request_handler. 重定向后路由: {redirect_path}")

            return redirect(redirect_path)

    app.before_request(before_request_handler)

    return app


def get_environment():
    return environ.get("APPLICATION_ENV") or "development"
