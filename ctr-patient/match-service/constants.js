/**
 * Backend Endpoint
 * @type {string}
 * @module MatchService
 */
const ENDPOINT = 'http://127.0.0.1:3000/borest/ctrms/submit';

/**
 * API Hub middleware endpoint
 * @type {string}
 * @module MatchService
 */
const API_HUB_ENDPOINT = '/ctr/submit#x-blockchain-domain-request'; // the '#x-blockchain-domain-request' fragment is needed to bypass the service worker

/**
 * Common headers for CTR requests
 * @type {{}}
 * @module MatchService
 */
const HEADERS = {
    headers: {
        'content-type': 'application/json; charset=utf-8'
    }
};

module.exports = {
    ENDPOINT,
    API_HUB_ENDPOINT,
    HEADERS
}