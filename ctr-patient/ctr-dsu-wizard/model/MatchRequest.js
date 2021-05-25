/**
 * @module ctr-dsu-wizard.model
 */

const { Validatable } = require('../../pdm-dsu-toolkit/model/Validations');

const { GHI, TRIAL_PREFS } = require('../formDefs');

/**
 * Match request set of forms.
 */
class MatchRequest extends Validatable{

    id = undefined;

    ghiForm = undefined;

    trialPrefs = undefined;

    /**
     * 
     * @param {object} ghi an LForm for general health information.
     */
    constructor(ghi) {
        super();
        this.id = '_' + Math.random().toString(36);
        // deep clone ghi
        if (ghi) 
            this.ghiForm = JSON.parse(JSON.stringify(ghi));
        else
            this.ghiForm = JSON.parse(JSON.stringify(GHI));
    }

    /**
     * 
     * @returns the trial preference LForm object
     */
    initTrialPreferences() {
        if (!this.trialPrefs)
            this.trialPrefs = JSON.parse(JSON.stringify(TRIAL_PREFS));
        return this.trialPrefs;
    }
}

module.exports = MatchRequest;