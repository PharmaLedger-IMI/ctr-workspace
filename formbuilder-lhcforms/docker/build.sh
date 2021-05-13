#!/bin/bash -x

docker build -t pharmaledger/formbuilder-lhcforms "$(dirname $(readlink -f $0))" --no-cache --network host
