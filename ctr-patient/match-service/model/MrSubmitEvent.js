/**
 * Data holder class for the MatchRequest submit event to be sent to CTR backoffice.
 * @class MrSubmitEvent
 * @module Model
 */
class MrSubmitEvent {
    /**
     * MatchRequest ID is a string.
     */
    id;

    constructor(matchRequest){
        this.id = matchRequest.id;
    }

    /**
     * Submit the event to CTR backend via {@link MatchService#_submit}
     * Will be bound by the {@link MatchService} upon creation
     * @param {function(err, response)} [callback]
     */
    submit(callback){}
}

module.exports = MrSubmitEvent;