/**
 * @module ctr-dsu-wizard.managers
 */
const {ANCHORING_DOMAIN} = require('../constants');
const BaseManager = require('../../pdm-dsu-toolkit/managers/BaseManager');
const Participant = require('../model/Participant');

/**
 * Participant Manager Class
 *
 * Manager Classes in this context should do the bridge between the controllers
 * and the services exposing only the necessary api to the controllers while encapsulating <strong>all</strong> business logic.
 *
 * All Manager Classes should be singletons.
 *
 * This complete separation of concerts is very beneficial for 2 reasons:
 * <ul>
 *     <li>Allows for testing since there's no browser dependent code (i think) since the DSUStorage can be 'mocked'</li>
 *     <li>Allows for different controllers access different business logic when necessary (while benefiting from the singleton behaviour)</li>
 * </ul>
 *
 * Should eventually integrate with the WP3 decisions
 *
 * @param {DSUStorage} dsuStorage the controllers dsu storage
 * @param {boolean} [force] defaults to false. overrides the singleton behaviour and forces a new instance.
 * Makes DSU Storage required again!
 * @param {function(err, ParticipantManager)} [callback}
 */
class ParticipantManager extends BaseManager{
    constructor(dsuStorage, force, callback) {
        super(dsuStorage, force, callback);
        this.participantService = new (require('../services/ParticipantService'))(ANCHORING_DOMAIN);
        this.matchRequestService = new (require('../services/MatchRequestService'))(ANCHORING_DOMAIN);
    };

    /**
     * Must return the string to be used to generate the DID
     * @param {object} identity
     * @param {string} participantConstSSI
     * @param {function(err, string)}callback
     * @protected
     * @override
     */
    _getDIDString(identity, participantConstSSI, callback){
        const aDidStr = (new Participant()).generateDID(identity);
        callback(undefined, aDidStr);
    }

    /**
     * Initializes a default MatchRequest for this patient.
     * @param {function(err, object)} callback
     */
    newMatchRequest(callback) {
        const self = this;
        self.getIdentity((err, participant) => {
            if (err)
                return callback(err);
            self.readPersonalHealthInfo((err, phi) => {
                if (err)
                    return callback(err);
                const MatchRequest = require('../model/MatchRequest');
                const matchRequest = new MatchRequest(phi);
                return callback(err, matchRequest);
            });
        });
    }
    
    /**
     * If this patient has personal health information, gives it to the callback.
     * Otherwise, the second callback argument is called with undefined.
     * @param {function(err, object)} callback
     * @returns {undefined}
     */
    readPersonalHealthInfo(callback) {
        this.participantService.readPersonalHealthInfo(this._getRootDSU(), callback);
    }
    

    /**
     * Write (or overwrite) the personal health record information.
     * @param {object} phi an object that will be converted with JSON.stringify.
     * @param {function(err)} callback
     * @returns {undefined}
     */
    writePersonalHealthInfo(phi, callback) {
        this.participantService.writePersonalHealthInfo(this._getRootDSU(), phi, callback);
    }
    

    /**
     * Create a const DSU for MatchRequest.
     * @param {matchRequest} matchRequest an object that will be converted with JSON.stringify.
     * @param {function(err, matchRequestConstDSU)} callback
     * @returns {undefined}
     */
    submitMatchRequest(matchRequest, callback) {
        matchRequest.submittedOn = new Date();
        this.matchRequestService.create(matchRequest, callback);
    }
}

let participantManager;

/**
 * @param {DSUStorage} [dsuStorage] only required the first time, if not forced
 * @param {boolean} [force] defaults to false. overrides the singleton behaviour and forces a new instance.
 * Makes DSU Storage required again!
 * @param {function(err, ParticipantManager)} [callback]
 * @returns {ParticipantManager}
 */
const getParticipantManager = function (dsuStorage, force, callback) {
    if (!callback){
        if (typeof force === 'function'){
            callback = force;
            force = false;
        }
    }
    if (!participantManager || force) {
        if (!dsuStorage)
            throw new Error("No DSUStorage provided");
        participantManager = new ParticipantManager(dsuStorage, force, callback);
    }
    return participantManager;
}

module.exports = getParticipantManager;