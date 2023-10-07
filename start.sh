#!/usr/bin/env bash

if [[ ! -f "/data/open-c3-federation/.env" ]]; then
    echo "APPLICATION_ENV=production" > /data/open-c3-federation/.env
    echo "APP_NAME=app" >> /data/open-c3-federation/.env
fi

if [[ ! -f "/data/open-c3-federation/config.json" ]]; then
    echo "错误: /data/open-c3-federation/config.json 文件不存在!"
    exit 1
fi

PORT=$(python -c 'import json; print(json.load(open("config.json"))["port"])')

docker run --restart=always -v /data/open-c3-federation/:/app/ \
  -p "$PORT":"$PORT" -d --name open-c3-federation open-c3-federation:latest /app/entrypoint.sh
