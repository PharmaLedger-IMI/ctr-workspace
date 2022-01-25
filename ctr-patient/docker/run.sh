#!/bin/bash
UCNAME="ctr-patient"

# published ports are discarded in network=host mode
#    --publish 8080:8080 \

docker run --detach \
    --network="host" \
    --mount source=external-volume,target=/ctr-workspace/ctr-patient/apihub-root/external-volume  \
    --hostname $UCNAME \
    --name $UCNAME \
    --restart always \
    pharmaledger/$UCNAME
