#!/usr/bin/env bash

if docker ps -a | grep -q "open-c3-federation"; then
    docker rm -f open-c3-federation
fi
