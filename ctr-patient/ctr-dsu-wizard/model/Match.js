/**
 * @module ctr-dsu-wizard.model
 */

/**
 * Match - contains the constSSI of MatchRequest, and maybe the optional constSSI of MatchResult
 */
class Match {
    id = undefined; // same as in MatchRequest

    matchRequestConstSSIStr = undefined;

    submittedOnStr = undefined;

    matchResultConstSSIStr = undefined;

    /**
     * Initialize fields.
     * @param {MatchRequest} [matchRequest] initialize fields from MatchRequest.
     */
    constructor(matchRequest) {
        if (matchRequest) {
            this.id = matchRequest.id;
            this.submittedOn = matchRequest.submittedOn;
            this.matchRequestConstSSIStr = matchRequest.constKeySSIStr;
        }
    }
}

module.exports = Match;