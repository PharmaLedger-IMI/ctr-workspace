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

    conditionStr = undefined;

    locationStr = undefined;

    matchResultConstSSIStr = undefined;

    /**
     * Initialize fields.
     * @param {MatchRequest} [matchRequest] initialize fields from MatchRequest.
     */
    constructor(matchRequest) {
        if (matchRequest) {
            this.id = matchRequest.id;
            this.submittedOnStr = matchRequest.submittedOn.toLocaleString();
            this.matchRequestConstSSIStr = matchRequest.constKeySSIStr;
            this.conditionStr = "?";
            this.locationStr = "?";
        }
    }
}

module.exports = Match;