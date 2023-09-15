#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

import atexit
import logging.config
import threading
import time
from os import environ

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from app.core.cache.cache_base import cache
from app.core.view.connector_views import connector_view
from app.core.view.job_views import job_view
from app.core.view.other_views import other_view
from .config import app_config, data_config


def create_app():
    # loading env vars from .env file
    load_dotenv()
    APPLICATION_ENV = get_environment()
    logging.config.dictConfig(app_config[APPLICATION_ENV].LOGGING)
    app = Flask(app_config[APPLICATION_ENV].APP_NAME)
    CORS(app)
    app.config.from_object(app_config[APPLICATION_ENV])

    app.register_blueprint(connector_view, url_prefix="/api/connector")
    app.register_blueprint(job_view, url_prefix="/api/job")
    app.register_blueprint(other_view, url_prefix="/api/other")

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

    return app


def get_environment():
    return environ.get("APPLICATION_ENV") or "development"
