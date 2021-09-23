/**
 * @module ctr-dsu-wizard.services
 */
const {INFO_PATH, MATCH_REQUEST_APPLY_API_HUB_ENDPOINT, MATCH_REQUEST_TRIALFIND_API_HUB_ENDPOINT, MATCH_REQUEST_TRIALPREFS_API_HUB_ENDPOINT, MATCH_REQUEST_SUBMIT_API_HUB_ENDPOINT, MATCH_REQUEST_SUBMIT_HEADERS} = require('../constants');
const utils = require('../../pdm-dsu-toolkit/services/utils');

/**
 * @param {string} domain: anchoring domain. defaults to 'default'
 * @param {strategy} strategy
 */
function MatchRequestService(domain, strategy){
    const strategies = require("../../pdm-dsu-toolkit/services/strategy");

    let isSimple = strategies.SIMPLE === (strategy || strategies.SIMPLE);
    domain = domain || "default";

    /**
     * Creates an MatchRequest's const DSU.
     * @param {MatchRequest} matchRequest
     * @param {function(err, participantKeySSI)} callback
     */
    this.create = function(matchRequest, callback){
        if (typeof callback != "function")
            throw new Error("callback must be a function!");
        if (isSimple){
            createSimple(matchRequest, callback);
        } else {
            throw new Error("Not implemented"); // createAuthorized(matchRequest, callback);
        }
    }

    let createSimple = function (matchRequest, callback) {
        const matchRequestConstKeyGenFunction = require('../commands/setMatchRequestConstSSI').createMatchRequestConstSSI;
        let matchRequestConstTemplateKeySSI = matchRequestConstKeyGenFunction(matchRequest, domain);
        // Test of the const already exists for the given participant.id.
        // Commented out because error messages are not very good!
        // Let it fail on creating a dup const.
        //
        // TODO better error message for duplicate id ?
        //
        //const openDSU = require('opendsu');
        //const resolver = openDSU.loadApi("resolver");
        //resolver.loadDSU(matchRequestConstTemplateKeySSI, undefined, (err, matchRequestConstDsu) => {
        //    console.log("loadDSU error", err);
        //    if (!err) {
        //        callback("There is already a MatchRequest DSU id=" + matchRequest.id);
        //    }
        //
        // Create the const first. As it is non-transactional, if it fails, stop right away.
        utils.selectMethod(matchRequestConstTemplateKeySSI)(matchRequestConstTemplateKeySSI, (err, matchRequestConstDsu) => {
            if (err)
                return callback(err);
            matchRequestConstDsu.getKeySSIAsObject((err, matchRequestConstKeySSI) => {
                if (err)
                    return callback(err);
                console.log("matchRequestConstKeySSI ", matchRequestConstKeySSI.getIdentifier());
                matchRequestConstDsu.writeFile(INFO_PATH, JSON.stringify(matchRequest), (err) => {
                    if (err)
                        return callback(err);
                    return callback(err, matchRequestConstDsu);
                });
            });
        });
    };
    
    /**
     * Locate the const DSU of a participant, given the id.
     * @param {string} id - a MatchRequest.id
     * @param {function(err, matchRequestConstDsu)} callback
     */
    this.locateConstDSU = function(id, callback) {
        const opendsu = require("opendsu");
        const resolver = opendsu.loadApi("resolver");
        const matchRequestConstKeyGenFunction = require('../commands/setMatchRequestConstSSI').createMatchRequestConstSSI;
        const matchRequestConstKeySSI = matchRequestConstKeyGenFunction({id: id}, domain);
        resolver.loadDSU(matchRequestConstKeySSI, (err, matchRequestConstDsu) => {
            if (err)
                return callback(err);
            callback(undefined, matchRequestConstDsu);
        });
    };
    

    /**
     * Submit the MatchRequest to the backoffice.
     * @param {MatchRequest} matchRequest - an object suitable for JSON.stringify
     * @param {function(err, res)} callback
     */
    this.submit = function(matchRequest, callback) {
        const opendsu = require("opendsu");
        const http = opendsu.loadApi('http');
        let mrUrl = MATCH_REQUEST_SUBMIT_API_HUB_ENDPOINT;
        // TODO - hack to check if running a test from command line
        if (typeof window === 'undefined')
            mrUrl = "http://127.0.0.1:8080" + mrUrl;
        http.doPost(
            mrUrl,
            JSON.stringify(matchRequest),
            MATCH_REQUEST_SUBMIT_HEADERS,
            callback
        );
    };


    /**
     * Submit a clinical trial application
     * @param {object} query
     * @param {function(err, res)} callback
     */
    this.applyForATrial = (query, callback) => {
        const opendsu = require("opendsu");
        const http = opendsu.loadApi('http');
        let mrUrl = MATCH_REQUEST_APPLY_API_HUB_ENDPOINT;
        // TODO - hack to check if running a test from command line
        if (typeof window === 'undefined') {
            mrUrl = 'http://127.0.0.1:8080' + mrUrl;
        }
        http.doPost(
            mrUrl,
            JSON.stringify(query),
            MATCH_REQUEST_SUBMIT_HEADERS,
            callback
        );
    };

    /**
     * Submit query to list available trials.
     * @param {object} query an object that will be converted with JSON.stringify.
     * @param {function(err, paginatedDto)} callback
     */
     this.submitFindTrials = function(query, callback) {
        const opendsu = require("opendsu");
        const http = opendsu.loadApi('http');
        let mrUrl = MATCH_REQUEST_TRIALFIND_API_HUB_ENDPOINT;
        // TODO - hack to check if running a test from command line
        if (typeof window === 'undefined')
            mrUrl = "http://127.0.0.1:8080" + mrUrl;
        http.doPost(
            mrUrl,
            JSON.stringify(query),
            MATCH_REQUEST_SUBMIT_HEADERS,
            callback
        );
    };

    /**
     * Submit a partial MatchRequest to the backoffice.
     * @param {MatchRequest} matchRequest - an object suitable for JSON.stringify
     * @param {function(err, res)} callback
     */
     this.submitTrialPrefs = function(matchRequest, callback) {
        const opendsu = require("opendsu");
        const http = opendsu.loadApi('http');
        let mrUrl = MATCH_REQUEST_TRIALPREFS_API_HUB_ENDPOINT;
        // TODO - hack to check if running a test from command line
        if (typeof window === 'undefined')
            mrUrl = "http://127.0.0.1:8080" + mrUrl;
        http.doPost(
            mrUrl,
            JSON.stringify(matchRequest),
            MATCH_REQUEST_SUBMIT_HEADERS,
            callback
        );
    };
};

module.exports = MatchRequestService;