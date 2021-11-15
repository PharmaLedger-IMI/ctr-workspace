/**
 * ctr-backoffice-backend Endpoints.
 * Replace with https://ctr-dev.pharmaledger.pdmfc.com/borest/ctrms/*
 * to run using the DEV environment services.
 * For changes to take effect, you need to do an
 *     npm run clean ; npm run build-all
 * and you need to restart the apihub
 *     npm run server
 * Please do not commit altered versions to master.
 * The constant ENDPOINT_LOCALHOST is also used by dsu-wizard/constants.js
 * and indirectly by MatchManager.envReplaceRestUrl()
 * @type {string}
 */
const ENDPOINT_LOCALHOST = "http://127.0.0.1:3000"; // #44 TODO PWA blocks localhost, but does not block 127.0.0.1
//const ENDPOINT_LOCALHOST = "https://ctr-dev.pharmaledger.pdmfc.com";

const ENDPOINT_APPLY  = `${ENDPOINT_LOCALHOST}/borest/ctrms/apply`;
const ENDPOINT_TRIALFIND  = `${ENDPOINT_LOCALHOST}/borest/ctrms/trialFind`;
const ENDPOINT_TRIALPREFS = `${ENDPOINT_LOCALHOST}/borest/ctrms/trialPrefs`;
const ENDPOINT_SUBMIT     = `${ENDPOINT_LOCALHOST}/borest/ctrms/submit`;



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
    ENDPOINT_LOCALHOST,
    ENDPOINT_APPLY,
    ENDPOINT_TRIALFIND,
    ENDPOINT_TRIALPREFS,
    ENDPOINT_SUBMIT,
    HEADERS
};