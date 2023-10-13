#!/bin/bash

PORT=$(grep "^port:" config.yaml | awk '{print $2}')

exec pipenv run gunicorn run:app -w 5 -b 0.0.0.0:"$PORT"

