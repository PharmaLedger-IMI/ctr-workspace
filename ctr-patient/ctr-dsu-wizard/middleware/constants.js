/**
 * ctr-backoffice-backend Endpoint
 * @type {string}
 */
const ENDPOINT = 'http://127.0.0.1:3000/borest/ctrms/submit';

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
    ENDPOINT,
    HEADERS
};