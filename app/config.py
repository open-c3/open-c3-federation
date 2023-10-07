#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from os import environ, path

import yaml
from dotenv import load_dotenv


def load_config():
    with open("config.json", "r") as f:
        return yaml.safe_load(f)


basedir = path.abspath(path.join(path.dirname(__file__), ".."))
# loading env vars from .env file
load_dotenv()


class BaseConfig(object):
    """Base config class."""

    APP_NAME = environ.get("APP_NAME")
    ORIGINS = ["*"]
    EMAIL_CHARSET = "UTF-8"


class Development(BaseConfig):
    """Development config."""

    DEBUG = True
    ENV = "dev"


class Staging(BaseConfig):
    """Staging config."""

    DEBUG = True
    ENV = "staging"


class Production(BaseConfig):
    """Production config"""

    DEBUG = False
    ENV = "production"


app_config = {
    "development": Development,
    "staging": Staging,
    "production": Production,
}


data_config = load_config()
