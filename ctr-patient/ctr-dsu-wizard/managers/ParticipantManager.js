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
        this.lastCoords = undefined; // never set
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
     * Utility method to clone an object recursively.
     * Used to clone geolocation because of issue #58 on firefox
     * https://stackoverflow.com/questions/11042212/ff-13-ie-9-json-stringify-geolocation-object
     * 
     * @param {any} obj 
     * @returns a clone of obj
     */
    _cloneAsObject(obj) {
        if (obj === null || !(obj instanceof Object)) {
            return obj;
        }
        var temp = (obj instanceof Array) ? [] : {};
        // ReSharper disable once MissingHasOwnPropertyInForeach
        for (var key in obj) {
            temp[key] = this._cloneAsObject(obj[key]);
        }
        return temp;
    }

    /**
     * Set last successful geoLocation of the patient.
     * @param {object} coords The object returned by navigator.geoLocation.getCurrentPosition()
     */
    setLastLocation(coords) {
        // issue #58 - clone the object for it to survice JSON.stringify on firefox
        this.lastCoords = this._cloneAsObject(coords);
    }

    /**
     * Get last successful geoLocation of the patient.
     * @returns undefined if never set (or expired).
     */
    getLastLocation() {
        // TODO forget after a while ?
        return this.lastCoords;
    }

    /**
     * Initializes a default single-trial MatchRequest for this patient.
     * @param {object} ctr - a clinical trial
     * @param {function(err, object)} callback
     */
    newMatchRequestFromTrial(ctr, callback) {
        const self = this;
        self.newMatchRequest((err, mr) => {
            if (err)
                return callback(err);
            mr.clinicalTrial = JSON.parse(JSON.stringify(ctr)); // deep clone, just in case
            mr.coords = self.getLastLocation(); // if there is geoLocation cached, use it.
            return callback(undefined, mr);
        });
    }

    /**
     * Initializes a default MatchRequest for this patient.
     * Currently the MatchRequest is initialized with the Personal
     * Health Information.
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