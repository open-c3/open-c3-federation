#!/usr/bin/env bash

set -e

docker build -t open-c3-federation-frontend:latest .

docker run --name open-c3-federation-frontend open-c3-federation-frontend:latest

rm -rf /data/open-c3-federation/app/static/*
mkdir -p /data/open-c3-federation/app/static
docker cp open-c3-federation-frontend:/app/dist/. /data/open-c3-federation/app/static

docker rm -f open-c3-federation-frontend
docker rmi open-c3-federation-frontend:latest