#!/usr/bin/env bash

if [[ ! -f "/data/open-c3-federation/.env" ]]; then
    echo "APPLICATION_ENV=production" > /data/open-c3-federation/.env
    echo "APP_NAME=app" >> /data/open-c3-federation/.env
fi

if [[ ! -f "/data/open-c3-federation/config.yaml" ]]; then
    echo "错误: /data/open-c3-federation/config.yaml 文件不存在!"
    exit 1
fi

PORT=$(grep "^port:" config.yaml | awk '{print $2}')

docker run --restart=always -v /data/open-c3-federation/:/app/ \
  -p "$PORT":"$PORT" -d --name open-c3-federation open-c3-federation:latest /app/entrypoint.sh
