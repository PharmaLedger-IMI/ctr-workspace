#!/bin/bash -xe
( cd ctr-patient ; npm run server ) &
( cd ctr-patient ; sleep 10 ; npm run clean ; npm run build-all ) &
( cd ctr-backoffice-backend ; npm run start ) &
( cd ctr-backoffice-frontend ; npm run start ) &
( cd ctr-patient/tests/ctr-dsu-wizard ; sleep 60 ; node ctr-dsu-wizard-test.js )