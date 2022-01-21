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

Run `npx ng serve` for a dev server. When it says "Compiled successfully", open a browser on http://localhost:4200/backoffice/`. The app will automatically reload if you change any of the source files.

The application comes pre-configured to use the REST services at the DEV environment. You need to edit ctr-backoffice-frontend/src/environments/environment.ts and change REST services to localhost:3000 to use the ctr-backoffice-backend on your local computer.

## Code scaffolding

Run `npx ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npx ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npx ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npx ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



# TODOs

For internal discussion:

* form layout and display of form submition errors

* FHIR forms support ?
  * https://www.hl7.org/fhir/questionnaire.html ?
  * Re-use parts of http://lhncbc.github.io/lforms/ ? https://lhcforms.nlm.nih.gov/  National Library of Medicine has a page of FHIR tools (some web-remote), which might help speed up some proof-of-concepts. (License appears to be BSD based which seems proper for use).
  * https://confluence.hl7.org/display/FHIR/Open+Source+Implementations 


* component naming convention ?
  * tablename/Index (or List) -> tablename-list.component.*
  * tablename/Info -> tablename-list.component.*
  * tablename/Edit -> tablename-edit.component.*
  * tablename/Delete -> tablename-delete.component.*

* services by table, or one full service for DB ? Ex: appresource.service.ts vs ctrial.service.ts ? jpsl: One for table (for big DBs), but we need to centralize logging messages somehow...


