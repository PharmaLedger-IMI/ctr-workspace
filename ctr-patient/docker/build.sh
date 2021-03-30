#!/bin/bash -x

docker build -t pharmaledger/ctr-workspace "$(dirname $(readlink -f $0))" --no-cache --network host
