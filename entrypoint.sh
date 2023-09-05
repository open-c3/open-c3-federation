#!/bin/bash

PORT=$(python -c 'import json; print(json.load(open("/app/config.json"))["port"])')

exec pipenv run gunicorn run:app -w 5 -b 0.0.0.0:$PORT
