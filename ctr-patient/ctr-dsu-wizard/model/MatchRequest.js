/**
 * @module ctr-dsu-wizard.model
 */

const { Validatable } = require('../../pdm-dsu-toolkit/model/Validations');

const { GHI, TRIAL_PREFS, CONDITION, TRIAL } = require('../formDefs');

/**
 * Match request set of forms.
 */
class MatchRequest extends Validatable{

    id = undefined;

    ghiForm = undefined;

    trialPrefs = undefined;

    condition = undefined;

    trial = undefined;

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
     * If the trial preferences are empty, initialize it
     * from the blank form definition.
     * 
     * @returns the trial preference LForm object
     */
     initTrialPreferences() {
        if (!this.trialPrefs)
            this.trialPrefs = JSON.parse(JSON.stringify(TRIAL_PREFS));
        return this.trialPrefs;
    }

    /**
     * If the condition specific questions are empty, initialize it
     * from the blank form definition.
     * 
     * @returns the condition specific LForm object
     */
    initCondition(/* TODO medical condition */) {
        if (!this.condition)
            this.condition = JSON.parse(JSON.stringify(CONDITION));
        return this.condition;
    }

    /**
     * If the trial specific questions are empty, initialize it
     * from the blank form definition.
     * 
     * @returns the trial specific LForm object
     */
    initTrial(/* TODO medical condition */) {
        if (!this.trial)
            this.trial = JSON.parse(JSON.stringify(TRIAL));
        return this.condition;
    }
}

module.exports = MatchRequest;