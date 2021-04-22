# ctr-backoffice-frontend

Main Web Site for ClinicalTrials - TODO decide if it includes the
backoffice web management application only, or if it includes
wallet download and backoffice web management application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

## Setup

### Node and npm

Major nodeJS version is 14. npm version was 6. (Latest stable versions).
(This does not mean it does not work with higher versions. Just means that the developers are using these versions).

### npm install

```
git clone https://github.com/PharmaLedger-IMI/ctr-workspace
cd ctr-workspace/ctr-backoffice-frontend
npm install
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/backoffice/`. The app will automatically reload if you change any of the source files.

For the features to work, you will need the backend setup - see ctr-workspace/ctr-backoffice-backend
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



# TODOs

For internal discussion:

* form layout and display of form submition errors

* FHIR forms support ?
  * https://www.hl7.org/fhir/questionnaire.html ?
  * Re-use parts of http://lhncbc.github.io/lforms/ ? https://lhcforms.nlm.nih.gov/  National Library of Medicine has a page of FHIR tools (some web-remote), which might help speed up some proof-of-concepts.
  * https://confluence.hl7.org/display/FHIR/Open+Source+Implementations 


* component naming convention ?
  * tablename/Index (or List) -> tablename-list.component.*
  * tablename/Info -> tablename-list.component.*
  * tablename/Edit -> tablename-edit.component.*
  * tablename/Delete -> tablename-delete.component.*

* services by table, or one full service for DB ? Ex: appresource.service.ts vs ctrial.service.ts ? jpsl: One for table (for big DBs), but we need to centralize logging messages somehow...


