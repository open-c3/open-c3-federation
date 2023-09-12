#!/usr/bin/env /usr/local/bin/python3
# -*- coding: utf-8 -*-

from flasgger import Swagger

from app import create_app, data_config

app = create_app()
swagger = Swagger(app)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=data_config["port"])
