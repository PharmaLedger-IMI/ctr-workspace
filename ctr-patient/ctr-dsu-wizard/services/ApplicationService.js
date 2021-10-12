/**
 * @module ctr-dsu-wizard.services
 */
const {INFO_PATH, MATCH_REQUEST_APPLY_API_HUB_ENDPOINT, MATCH_REQUEST_SUBMIT_HEADERS} = require('../constants');
const utils = require('../../pdm-dsu-toolkit/services/utils');
const Application = require('../model/Application');

/**
 * Clinical Trial Applications Service to handler DSU data
 * @param {string} domain: anchoring domain. defaults to 'default'
 * @param {strategy} strategy
 */
function ApplicationService(domain, strategy) {
    const strategies = require('../../pdm-dsu-toolkit/services/strategy');
    let isSimple = strategies.SIMPLE === (strategy || strategies.SIMPLE);
    domain = domain || 'default';

    /**
     * Creates an Clinical Trials Application const DSU.
     * @param {Application} application
     * @param {function(err, keySSI)} callback
     */
    /*
    this.create = (application, callback) => {
        if (typeof callback !== 'function') {
            throw new Error('callback must be a function!');
        }

        if (!isSimple) {
            throw new Error('Not implemented');
        }

        const applicationConstKeyGenFunction = require('../commands/setApplicationConstSSI').createApplicationConstSSI;
        let templateKeySSI = applicationConstKeyGenFunction(application, domain);
        utils.selectMethod(templateKeySSI)(templateKeySSI, (err, dsu) => {
            if (err) {
                return callback(err);
            }

            dsu.getKeySSIAsObject((err, applicationConstKeySSI) => {
                if (err) {
                    return callback(err);
                }
                console.log('### ApplicationService.create applicationConstKeySSI=', applicationConstKeySSI.getIdentifier());
                dsu.writeFile(INFO_PATH, JSON.stringify(application), (err) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(undefined, dsu);
                });
            });

        });
    };
    */

    /**
     * Submit a Clinical Trial Application
     * @param {object} clinicalTrialApplication
     * @param {function(err, res)} callback
     */
    this.applyForATrial = (clinicalTrialApplication, callback) => {
        const opendsu = require('opendsu');
        const http = opendsu.loadApi('http');
        let mrUrl = MATCH_REQUEST_APPLY_API_HUB_ENDPOINT;
        if (typeof window === 'undefined') {
            mrUrl = 'http://127.0.0.1:8080' + mrUrl;
        }
        http.doPost(
            mrUrl,
            JSON.stringify(clinicalTrialApplication),
            MATCH_REQUEST_SUBMIT_HEADERS,
            callback
        );
    };
}

module.exports = ApplicationService;