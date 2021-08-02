#!/bin/bash -x
curl -0 -v -X PUT http://localhost:3000/borest/ctrial/clinicaltrial \
-H "Expect:" \
-H 'Content-Type: application/json; charset=utf-8' \
--data-binary @- << EOF
{
    "id": "8f0759f0-357f-499f-86f1-db6486f72759",
    "status": {
        "code": "REC"
    }
}
EOF