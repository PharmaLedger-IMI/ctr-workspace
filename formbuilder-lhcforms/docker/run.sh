#!/bin/bash
UCNAME="formbuilder-lhcforms"

docker run --detach \
    --hostname $UCNAME \
    --publish 9030:9030 \
    --name $UCNAME \
    --restart always \
    pharmaledger/$UCNAME
