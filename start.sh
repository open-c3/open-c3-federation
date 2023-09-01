#!/usr/bin/env bash

docker run -v /data/open-c3-fed/data/.env:/app/.env \
  -v /data/open-c3-fed/data/config.json:/app/config.json \
  -p 5000:5000 -d --name open-c3-federation open-c3-federation:latest
