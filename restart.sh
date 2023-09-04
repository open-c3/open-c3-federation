#!/usr/bin/env bash

if [[ ! -d "/data/open-c3-federation/data" ]]; then
    echo "错误: /data/open-c3-federation/data 目录不存在!"
    exit 1
fi

if [[ ! -f "/data/open-c3-federation/data/.env" ]]; then
    echo "错误: /data/open-c3-federation/data/.env 文件不存在!"
    exit 1
fi

if [[ ! -f "/data/open-c3-federation/data/config.json" ]]; then
    echo "错误: /data/open-c3-federation/data/config.json 文件不存在!"
    exit 1
fi

bash ./stop.sh

PORT=$(python -c 'import json; print(json.load(open("config.json"))["port"])')

docker run --restart=always -v /data/open-c3-federation/data/.env:/app/.env \
  -v /data/open-c3-federation/data/config.json:/app/config.json \
  -p $PORT:$PORT -d --name open-c3-federation open-c3-federation:latest
