const {API_HUB_ENDPOINT, HEADERS} = require('./constants');
const MrSubmitEvent = require('./model/MrSubmitEvent');
const MrSubmitResult = require('./model/MrSubmitResult');

/**
 * Class responsible for managing ACDC integration in the eLeafletApp
 * @class MatchService
 * @module MatchService
 */
class MatchService {
    constructor() {
        this.http = require('opendsu').loadApi('http');
    }

    createMrSubmitEvent(matchRequest){
        const event = new MrSubmitEvent(matchRequest);
        event.submit = (cb) => this._submit.call(this, event, cb);
        return event;
    }

    _submit(evt, callback){
        const self = this;
        self.http.doPost(API_HUB_ENDPOINT, JSON.stringify(evt), HEADERS, callback);
    }
}

let matchService;

/**
 * Singleton enforcing method
 * @return {MatchService}
 * @module Reporting
 */
const getInstance = function(){
    if (!matchService)
        matchService = new MatchService();

    return matchService;
}

module.exports = {
    getInstance
};

