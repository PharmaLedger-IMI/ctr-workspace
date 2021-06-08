const { ANCHORING_DOMAIN, DB, DEFAULT_QUERY_OPTIONS } = require('../constants');
const Manager = require("../../pdm-dsu-toolkit/managers/Manager");
const Match = require('../model/Match');


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
        super.getAll(readDSU, options, (err, result) => {
            if (err)
                return self._err(`Could not parse Match ${JSON.stringify(result)}`, err, callback);
            console.log(`Parsed ${result.length} orders`);
            callback(undefined, result);
        });
    }

    /**
     * Create a const DSU for MatchRequest, and create a wrapper Match.
     * @param {matchRequest} matchRequest an object that will be converted with JSON.stringify.
     * @param {function(err, match)} callback
     * @returns {undefined}
     */
    submitMatchRequest(matchRequest, callback) {
        let self = this;
        matchRequest.submittedOn = new Date();
        self.matchRequestService.create(matchRequest, (err, matchRequestConstDSU) => {
            if (err)
                return callback(err);
            matchRequestConstDSU.getKeySSIAsObject((err, matchRequestConstKeySSI) => {
                if (err)
                    return callback(err);
                matchRequest.constKeySSIStr = matchRequestConstKeySSI.getIdentifier(true);
                const aMatch = new Match(matchRequest);
                self.insertRecord(aMatch.id, aMatch, (err) => {
                    return callback(err, aMatch);
                });
            });
        });

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
