/**
 * @module ctr-dsu-wizard.model
 */

/**
 * Match - a pair of MatchRequest and MatchResoult to be stored in a DB of the patient-ssapp.
 * Should contain at least the constSSI of MatchRequest, and the constSSI of MatchResult.
 * As of v0.4.16, it contains some fields from the MatchRequest,
 * and the whole DSU data from the MatchResult.
 */
class Match {
    id = undefined; // same as in MatchRequest

    matchRequestConstSSIStr = undefined;
    // The MatchRequest details (full JSON) are not stored here, as it is already anchored to the blockchain

    submittedOn = undefined;

    submittedOnStr = undefined;

    conditionStr = undefined;

    locationStr = undefined;

    matchResultConstSSIStr = undefined;

    displayNoMatch = undefined; // set to true when in need to display a matchResult that does not match.

    matchResult = undefined;

    /**
     * Initialize fields.
     * @param {MatchRequest} [matchRequest] initialize fields from MatchRequest.
     * @param {MatchResult} [matchRequest] initialize fields from MatchResult.
     */
    constructor(matchRequest, matchResult) {
        if (matchRequest) {
            this.id = matchRequest.id;
            this.submittedOn = matchRequest.submittedOn;
            this.submittedOnStr = matchRequest.submittedOn.toLocaleString();
            this.matchRequestConstSSIStr = matchRequest.constKeySSIStr;
            this.conditionStr = matchRequest.getMedicalConditionStr();
            this.locationStr = matchRequest.getLocationStr();
            this.displayNoMatch = !!matchRequest.clinicalTrial; // if the matchrequest is for a single trial, display the matchResult even if no match.
        }
        this.matchResult = matchResult;
        // TODO matchResult does not have yet a keySSI
    }
}

module.exports = Match;