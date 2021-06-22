/**
 * ctr-backoffice-backend Endpoints
 * @type {string}
 */
 const ENDPOINT_TRIALPREFS = 'http://127.0.0.1:3000/borest/ctrms/trialPrefs';
 const ENDPOINT_SUBMIT     = 'http://127.0.0.1:3000/borest/ctrms/submit';

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
    ENDPOINT_TRIALPREFS,
    ENDPOINT_SUBMIT,
    HEADERS
};