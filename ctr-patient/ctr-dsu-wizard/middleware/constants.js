/**
 * ctr-backoffice-backend Endpoints.
 * Replace with https://ctr-dev.pharmaledger.pdmfc.com/borest/ctrms/*
 * to run using the DEV environment services.
 * For changes to take effect, you need to do an
 *     npm run clean ; npm run build-all
 * and you need to restart the apihub
 *     npm run server
 * Please do not commit altered versions to master.
 * @type {string}
 */
 const ENDPOINT_APPLY  = 'http://127.0.0.1:3000/borest/ctrms/apply';
 const ENDPOINT_TRIALFIND  = 'http://127.0.0.1:3000/borest/ctrms/trialFind';
 const ENDPOINT_TRIALPREFS = 'http://127.0.0.1:3000/borest/ctrms/trialPrefs';
 const ENDPOINT_SUBMIT     = 'http://127.0.0.1:3000/borest/ctrms/submit';

 //const ENDPOINT_TRIALFIND  = 'https://ctr-dev.pharmaledger.pdmfc.com/borest/ctrms/trialFind';
 //const ENDPOINT_TRIALPREFS = 'https://ctr-dev.pharmaledger.pdmfc.com/borest/ctrms/trialPrefs';
 //const ENDPOINT_SUBMIT     = 'https://ctr-dev.pharmaledger.pdmfc.com/borest/ctrms/submit';


/**
 * Common headers for CTR requests
 * @type {{}}
 */
const HEADERS = {
    headers: {
        'content-type': 'application/json; charset=utf-8'
    }
};

module.exports = {
    ENDPOINT_APPLY,
    ENDPOINT_TRIALFIND,
    ENDPOINT_TRIALPREFS,
    ENDPOINT_SUBMIT,
    HEADERS
};