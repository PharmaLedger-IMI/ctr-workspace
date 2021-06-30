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

    trialPrefsError = undefined; // filled after submission of trialPrefs is returned

    trialPrefsWarning = undefined; // filled after submission of trialPrefs is returned

    conditionBlank = undefined; // condition specific questions blank form
       // filled after submitting trialPrefs

    condition = undefined;

    trialBlank = undefined; // trial specific questions blank form
       // filled after submitting trialPrefs

    trial = undefined;

    submittedOn = undefined; // filled only when submitted

    constKeySSIStr = undefined; // filled only after anchoring to the blockchain. In the brick data, it is undefined.

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
     * Initialize condition specific form questions
     * from the blank form definition.
     * Previous condition form answer is lost.
     * 
     * @returns the condition specific LForm object
     */
    initCondition() {
        if (this.conditionBlank) {
            this.condition = JSON.parse(JSON.stringify(this.conditionBlank));
        } else {
            this.condition = JSON.parse(JSON.stringify(CONDITION));
        }
        return this.condition;
    }

    /**
     * Initialize it from the blank form definition.
     * Previous answers (if any) are lost.
     * 
     * @returns the trial specific LForm object
     */
    initTrial() {
        if (this.trialBlank) {
            this.trial = JSON.parse(JSON.stringify(this.trialBlank));
        } else {
            this.trial = JSON.parse(JSON.stringify(TRIAL));
        }
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