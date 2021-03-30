#!/bin/bash

docker build -t pharmaledger/ctr-backoffice-backend "$(dirname $(readlink -f $0))" --no-cache --network host
