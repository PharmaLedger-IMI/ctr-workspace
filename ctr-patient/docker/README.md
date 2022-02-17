# These are the scripts to build the docker container for the ctr-patient app

To build, just run the build.sh script.



# External data volume tips

## Setting up docker volume external-volume for the 1st time in DEV and TST

```
pharmaledger@ctr-dev-pl:~$ date
Fri Jan 21 15:43:51 UTC 2022
pharmaledger@ctr-dev-pl:~$ docker volume create external-volume
external-volume
pharmaledger@ctr-dev-pl:~$ docker volume inspect external-volume
[
    {
        "CreatedAt": "2022-01-21T15:43:58Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/external-volume/_data",
        "Name": "external-volume",
        "Options": {},
        "Scope": "local"
    }
]
pharmaledger@ctr-dev-pl:~$ sudo ls -l /var/lib/docker/volumes/external-volume/
total 4
drwxr-xr-x 2 root root 4096 Jan 21 15:43 _data
```

Done for TST on Feb 17 16:26.


## Manually reseting the docker volume external-volume contents

```
docker exec -it ctr-patient /bin/bash
root@acdc-workspace:/# npm run clean
root@acdc-workspace:/# npm run build-all
```
