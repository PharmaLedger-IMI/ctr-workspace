#!/bin/bash -x

docker build -t pharmaledger/ctr-backoffice-frontend "$(dirname $(readlink -f $0))" --no-cache --network host
