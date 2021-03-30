#!/bin/bash -x

docker build -t pharmaledger/ctr-patient "$(dirname $(readlink -f $0))" --no-cache --network host
