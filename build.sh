#!/usr/bin/env bash

set -e

docker build -t open-c3-federation:latest .

cd frontend
bash ./build.sh