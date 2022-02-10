# UC8 Clinical Trials Recruitment ctr-workspace

*ctr-workspace*  bundles all the project folders.

Sub-folders:


* ctr-patient - apihub + OpenDSU base patient facing application - contains the main ctr-patient/apihub-root/index.html entry page.
* ctr-backoffice-frontend - backoffice web management interface (for sponsors, sites and physicians) written in Angular
* ctr-backoffice-backend - backoffice REST services


See the README.md of each sub-folder for specific instructions.
All the 3 services need to be running fot the ctr-patient/patient-ssapp to work in a standalone environment.
See the start.sh script as an example of starting up all the services.

If you want to avoid setting up a PostgreSQL database locally, you may use the database at the DEV environment through the REST services, and only run the ctr-patient (and optionally the ctr-backoffice-frontend) locally. See the README.md of each application for more information on configuring REST services.

# Contributions

If you think you can contribute, please check with the team, if it is ok to submit a pull-request.

## Follow the "10 commandments" at https://jaxenter.com/10-commandments-committing-pull-requests-115707.html

1. Thou Shalt not reformat
2. Thou shalt absolutely not fix whitespace
3. Thou Shalt not refactor
4. Thou Shalt not move
5. Thou Shalt not rename
7. Thou shalt document
8. Thou shalt not implement more than one thing in a single commit
9. Thou shalt ask the vendor / community first
10. Thou shalt not demand
11. Thou shalt accept the license terms


