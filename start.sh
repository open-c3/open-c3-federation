#!/usr/bin/env bash

mkdir -p /data/open-c3-federation/data

if [[ ! -f "/data/open-c3-federation/data/.env" ]]; then
    echo "APPLICATION_ENV=production" > /data/open-c3-federation/data/.env
    echo "APP_NAME=app" >> /data/open-c3-federation/data/.env
fi

if [[ ! -f "/data/open-c3-federation/data/config.json" ]]; then
    echo "错误: /data/open-c3-federation/data/config.json 文件不存在!"
    exit 1
fi

PORT=$(python -c 'import json; print(json.load(open("config.json"))["port"])')

docker run --restart=always -v /data/open-c3-federation/data/.env:/app/.env \
  -v /data/open-c3-federation/data/config.json:/app/config.json \
  -v /data/open-c3-federation/data/approve_id.txt:/app/data/approve_id.txt \
  -p $PORT:$PORT -d --name open-c3-federation open-c3-federation:latest
