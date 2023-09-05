import logging.config
from os import environ

from dotenv import load_dotenv
from flask import Flask

from .config import app_config, data_config
from .core.api import cache
from .core.connector_views import connector_view
from .core.other_views import other_view


def create_app():
    # loading env vars from .env file
    load_dotenv()
    APPLICATION_ENV = get_environment()
    logging.config.dictConfig(app_config[APPLICATION_ENV].LOGGING)
    app = Flask(app_config[APPLICATION_ENV].APP_NAME)
    app.config.from_object(app_config[APPLICATION_ENV])

    app.register_blueprint(connector_view, url_prefix="/api/connector")
    app.register_blueprint(other_view, url_prefix="/api/other")

    return app


def get_environment():
    return environ.get("APPLICATION_ENV") or "development"
