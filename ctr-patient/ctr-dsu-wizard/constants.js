const ANCHORING_DOMAIN = "ctr";
const ENV_URL_LOCALHOST = "http://localhost";
const ENV_URL_DEV_PDM = "https://ctr-dev.pharmaledger.pdmfc.com";
const ENV_URL_DEV2_PDM = "https://ctr2-dev.pharmaledger.pdmfc.com";
const ENV_URL_TST_PDM = "https://ctr.pharmaledger.pdmfc.com";
const ENV_URL_TST2_PDM = "https://ctr2.pharmaledger.pdmfc.com";
const INFO_PATH = require('../pdm-dsu-toolkit/constants').INFO_PATH;
const MATCH_REQUEST_APPLY_API_HUB_ENDPOINT = '/ctr-match-service/apply#x-blockchain-domain-request'; // the '#x-blockchain-domain-request' fragment is needed to bypass the service worker
const MATCH_REQUEST_TRIALFIND_API_HUB_ENDPOINT = '/ctr-match-service/trialFind#x-blockchain-domain-request'; // the '#x-blockchain-domain-request' fragment is needed to bypass the service worker
const MATCH_REQUEST_TRIALPREFS_API_HUB_ENDPOINT = '/ctr-match-service/trialPrefs#x-blockchain-domain-request'; // the '#x-blockchain-domain-request' fragment is needed to bypass the service worker
const MATCH_REQUEST_SUBMIT_API_HUB_ENDPOINT = '/ctr-match-service/submit#x-blockchain-domain-request'; // the '#x-blockchain-domain-request' fragment is needed to bypass the service worker
const MATCH_REQUEST_SUBMIT_HEADERS = {
    headers: {
        'content-type': 'application/json; charset=utf-8'
    }
};
const PARTICIPANT_MOUNT_PATH = require('../pdm-dsu-toolkit/constants').PARTICIPANT_MOUNT_PATH;
const PERSONAL_HEALTH_INFO_PATH = "/personalHealthInfo";

const DB = {
    matches: 'matches'
};

const DEFAULT_QUERY_OPTIONS = require('../pdm-dsu-toolkit/constants').DEFAULT_QUERY_OPTIONS;

module.exports = {
    ANCHORING_DOMAIN,
    DB,
    DEFAULT_QUERY_OPTIONS,
    ENV_URL_LOCALHOST,
    ENV_URL_DEV_PDM,
    ENV_URL_DEV2_PDM,
    ENV_URL_TST_PDM,
    ENV_URL_TST2_PDM,
    INFO_PATH,
    MATCH_REQUEST_APPLY_API_HUB_ENDPOINT,
    MATCH_REQUEST_TRIALFIND_API_HUB_ENDPOINT,
    MATCH_REQUEST_TRIALPREFS_API_HUB_ENDPOINT,
    MATCH_REQUEST_SUBMIT_API_HUB_ENDPOINT,
    MATCH_REQUEST_SUBMIT_HEADERS,
    PARTICIPANT_MOUNT_PATH,
    PERSONAL_HEALTH_INFO_PATH
};