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

    submittedOn = undefined; // filled only when submitted

    constKeySSIStr = undefined; // filled only when submitted

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
        return this.trial;
    }

    /**
     * Get the medical condition description.
     * @returns a string with the medical condition description. Empty string if not defined.
     */
    getMedicalConditionStr() {
        let result = '';
        if (!this.trialPrefs
            || !this.trialPrefs.items
            || !Array.isArray(this.trialPrefs.items)) {
            console.log("No medical condition question on trialPrefs");
            return result;
        }
        const itemCondition = this.trialPrefs.items.find((item) => {
            return item.localQuestionCode && item.localQuestionCode==='condition';
        });
        if (!itemCondition) {
            console.log("No localQuestionCode==='condition' on trialPrefs");
            return result;
        }
        if (itemCondition.dataType!=='CWE') {
            console.log("localQuestionCode==='condition' expected type CWE on trialPrefs");
            return result;
        }
        if (!itemCondition.value) {
            console.log("No localQuestionCode==='condition' has no answer value on trialPrefs");
            return result;
        }
        if (!itemCondition.value.text) {
            console.log("No localQuestionCode==='condition' has no answer value.text on trialPrefs");
            return result;
        }
        result = itemCondition.value.text;
        return result;
    }

    /**
     * Get the location description.
     * @returns a string with the location description. Empty string if not defined.
     */
     getLocationStr() {
        let result = '';
        if (!this.trialPrefs
            || !this.trialPrefs.items
            || !Array.isArray(this.trialPrefs.items)) {
            console.log("No question items on trialPrefs");
            return result;
        }
        const itemCondition = this.trialPrefs.items.find((item) => {
            return item.localQuestionCode && item.localQuestionCode==='location';
        });
        if (!itemCondition) {
            console.log("No localQuestionCode==='location' on trialPrefs");
            return result;
        }
        if (itemCondition.dataType!=='CWE') {
            console.log("localQuestionCode==='location' expected type CWE on trialPrefs");
            return result;
        }
        if (!itemCondition.value) {
            console.log("No localQuestionCode==='location' has no answer value on trialPrefs");
            return result;
        }
        if (!itemCondition.value.text) {
            console.log("No localQuestionCode==='location' has no answer value on trialPrefs");
            return result;
        }
        result = itemCondition.value.text;
        return result;
    }

}

module.exports = MatchRequest;