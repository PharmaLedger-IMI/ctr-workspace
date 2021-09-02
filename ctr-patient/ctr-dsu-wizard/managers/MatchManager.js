const { ANCHORING_DOMAIN, DB, DEFAULT_QUERY_OPTIONS } = require('../constants');
const Manager = require("../../pdm-dsu-toolkit/managers/Manager");
const Match = require('../model/Match');
const { MatchRequest } = require('../model');


/**
 * Match Manager Class - concrete manager for Matches.
 * @param {ParticipantManager} participantManager the top-level manager for this participant, which knows other managers.
 */
class MatchManager extends Manager {
    constructor(participantManager) {
        super(participantManager, DB.matches, ['submittedOn']);
        this.matchRequestService = new (require('../services/MatchRequestService'))(ANCHORING_DOMAIN);
    }

    /**
     * Must wrap the DB entry in an object like:
     * <pre>
     *     {
     *         index1: ...
     *         index2: ...
     *         value: item
     *     }
     * </pre>
     * so the DB can be queried by each of the indexes and still allow for lazy loading
     * @param {string} key
     * @param {Order} item
     * @param {string|object} record
     * @return {object} the indexed object to be stored in the db
     * @protected
     * @override
     */
    _indexItem(key, item, record) {
        return {...super._indexItem(key, item, record), submittedOn: item.submittedOn};
    }

    /**
     * Eliminate rejected trials,
     * and sort an array of MatchResultClinicalTrial[] by ascending
     * travelDistanceKm, and then by descendant matchConfidenceToDisplay.
     * @param {MatchResultClinicalTrial[]} trials 
     * @returns {MatchResultClinicalTrial[]} a new Array
     */
     eliminateAndSortMatchResult(trials) {
        const self = this;
        let mtctCollection = [];
        trials.forEach((mtct) => {
            if (self.enrichMatchResultClinicalTrial(mtct))
                mtctCollection.push(mtct);
        });
        // sort by descending confidence, and then by ascendant travelDistanceKm
        mtctCollection.sort((mtct1, mtct2) => {
            if (mtct1.matchConfidenceToDisplay == mtct2.matchConfidenceToDisplay
                && mtct1.clinicalTrial.travDistMiles && mtct2.clinicalTrial.travDistMiles
            ) {
                return mtct1.clinicalTrial.travDistMiles - mtct2.clinicalTrial.travDistMiles;
            }
            return mtct2.matchConfidenceToDisplay - mtct1.matchConfidenceToDisplay;
        });
        return mtctCollection;
    }

    /**
     * Enrich object with properties matchConfidenceToDisplay and clinicalTrial.travDistKm.
     * @param {object} mtct See MatchResultClinicalTrial.dto.ts for expected fields
     * @returns true if this trial matches. false if not.
     */
    enrichMatchResultClinicalTrial(mtct) {
        // If there is travel distance, convert it to Km
        if (mtct.clinicalTrial.travDistMiles) {
            mtct.clinicalTrial.travDistKm = (Math.round(mtct.clinicalTrial.travDistMiles * 1.60934 * 100) / 100).toFixed(2);
        }
        mtct.matchConfidenceToDisplay = 0.0;
        if (mtct.criteriaMatchedCount >= mtct.criteriaCount) {
            mtct.matchConfidenceToDisplay = ((mtct.criteriaConfidenceCount / mtct.criteriaCount)*100.0).toFixed(1); // webcardinal seems unable to support complex @expressions so we calculate it here.
            return true;
        }
        return false;
    }

    /**
     * Lists all submitted matchs requests.
     * @param {boolean} [readDSU] defaults to true. decides if the manager loads and reads from the dsu's {@link INFO_PATH} or not
     * @param {object} [options] query options. defaults to {@link DEFAULT_QUERY_OPTIONS}
     * @param {function(err, Match[])} callback
     */
    getAll(readDSU, options, callback) {
        const defaultOptions = () => Object.assign({}, DEFAULT_QUERY_OPTIONS);

        if (!callback) {
            if (!options) {
                callback = readDSU;
                options = defaultOptions();
                readDSU = true;
            }
            if (typeof readDSU === 'boolean') {
                callback = options;
                options = defaultOptions();
            }
            if (typeof readDSU === 'object') {
                callback = options;
                options = readDSU;
                readDSU = true;
            }
        }

        options = options || defaultOptions();

        let self = this;

        self.query(options.query, options.sort, options.limit, (err, records) => {
            if (err)
                return self._err(`Could not perform query`, err, callback);
            if (!readDSU)
                return callback(undefined, records); // return the record array
            self._iterator(records.map(r => r.matchRequestConstSSIStr), self._getDSUInfo.bind(self), (err, result) => {
                if (err)
                    return self._err(`Could not parse ${self._getTableName()}s ${JSON.stringify(records)}`, err, callback);
                console.log(`Parsed ${result.length} ${self._getTableName()}s`);
                callback(undefined, result);
            });
        });
    }

    /**
     * Submit a query to search for trials.
     * @param {object} query an object that will be converted with JSON.stringify.
     * @param {function(err, paginatedDto)} callback
     * @returns {undefined}
     */
    submitFindTrials(query, callback) {
        let self = this;
        this.matchRequestService.submitFindTrials(query, (err, res) => {
            console.log("submitFindTrials", err, res);
            if (err)
                return callback(err);
            let resObj = res;
            if (typeof(res) === 'string') {
                resObj = JSON.parse(res);
            }
            return callback(err, resObj);
        });
    }

    /**
     * Create a const DSU for MatchRequest, and create a wrapper Match.
     * @param {matchRequest} matchRequest an object that will be converted with JSON.stringify.
     * @param {function(err, matchResult)} callback
     * @returns {undefined}
     */
    submitMatchRequest(matchRequest, callback) {
        let self = this;
        if (matchRequest.constKeySSIStr) {
            // Something went wrong on previous submission attempt.
            // When re-submitting, generate a new id, pretend it is a new MatchRequest.
            matchRequest.id = (new MatchRequest()).id
            matchRequest.constKeySSIStr = undefined;
        }
        matchRequest.submittedOn = new Date();
        self.matchRequestService.create(matchRequest, (err, matchRequestConstDSU) => {
            if (err)
                return callback(err);
            matchRequestConstDSU.getKeySSIAsObject((err, matchRequestConstKeySSI) => {
                if (err)
                    return callback(err);
                matchRequest.constKeySSIStr = matchRequestConstKeySSI.getIdentifier(true);
                this.matchRequestService.submit(matchRequest, (err, res) => {
                    console.log("submit", err, res);
                    if (err)
                        return callback(err);
                    const matchResult = JSON.parse(res);
                    const aMatch = new Match(matchRequest, matchResult);
                        self.insertRecord(aMatch.id, aMatch, (err) => {
                        return callback(err, aMatch);
                    });
                });
            });
        });
    }



    /**
     * Submit partial MatchRequest (with ghiForm and trialPrefs) to the server,
     * and set matchRequest.conditionBlank and matchRequest.trialBlank.
     * @param {matchRequest} matchRequest an object that will be converted with JSON.stringify.
     * @param {function(err)} callback
     * @returns {undefined}
     */
     submitTrialPrefs(matchRequest, callback) {
        let self = this;
        matchRequest.trialPrefsError = undefined;
        matchRequest.trialPrefsWarning = undefined;
        matchRequest.trials = undefined;
        this.matchRequestService.submitTrialPrefs(matchRequest, (err, res) => {
            console.log("submitTrialPrefs", err, res);
            if (err)
                return callback(err);
            let resObj = res;
            if (typeof(res) === 'string') {
                resObj = JSON.parse(res);
            }
            matchRequest.trialPrefsError = resObj.trialPrefsError;
            matchRequest.trialPrefsWarning = resObj.trialPrefsWarning;
            matchRequest.conditionBlank = resObj.conditionBlank;
            matchRequest.trialBlank = resObj.trialBlank;
            matchRequest.trials = resObj.trials;
            return callback(err);
        });
    }

    /**
     * Eliminate rejected trials,
     * and sort an array of MatchResultClinicalTrial[] by ascending
     * travelDistanceKm, and then by descendant matchConfidenceToDisplay.
     * @param {MatchResultClinicalTrial[]} trials 
     * @returns {MatchResultClinicalTrial[]} a new Array
     */
    eliminateAndSortMatchResult(trials) {
        let mtctCollection = [];
        trials.forEach((mtct) => {
            if (mtct.criteriaMatchedCount >= mtct.criteriaCount) {
                mtct.matchConfidenceToDisplay = ((mtct.criteriaConfidenceCount / mtct.criteriaCount)*100.0).toFixed(1); // webcardinal seems unable to support complex @expressions so we calculate it here.
                // If there is travel distance, convert it to Km
                if (mtct.clinicalTrial.travDistMiles) {
                    mtct.clinicalTrial.travDistKm = (Math.round(mtct.clinicalTrial.travDistMiles * 1.60934 * 100) / 100).toFixed(2);
                }
                mtctCollection.push(mtct);
            }
        });
        // sort by descending confidence, and then by ascendant travelDistanceKm
        mtctCollection.sort((mtct1, mtct2) => {
            if (mtct1.matchConfidenceToDisplay == mtct2.matchConfidenceToDisplay
                && mtct1.clinicalTrial.travDistMiles && mtct2.clinicalTrial.travDistMiles
            ) {
                return mtct1.clinicalTrial.travDistMiles - mtct2.clinicalTrial.travDistMiles;
            }
            return mtct2.matchConfidenceToDisplay - mtct1.matchConfidenceToDisplay;
        });
        return mtctCollection;
    }

}

let matchManager;
/**
 * @param {ParticipantManager} participantManager
 * @param {boolean} force
 * @returns {MatchManager}
 */
const getMatchManager = function (participantManager, force, callback) {
    if (!matchManager || force)
        matchManager = new MatchManager(participantManager);
    return matchManager;
}

module.exports = getMatchManager;
