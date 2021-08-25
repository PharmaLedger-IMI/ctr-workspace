import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * New Match Request - Trial Preferences
 */

export default class MatchRequestNew20TrialPrefsController extends LocalizedController {

    matchRequest = undefined;

    formElement = undefined; // DOM element that contains the p.h.i. form

    initializeModel = () => ({
      formErrors: undefined
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "matchrequestnew20trialprefs");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;
        self.formErrorsElement = self.element.querySelector('#FormErrorsContainer');
        self.formElement = self.element.querySelector('#FormContainer');

        self.onTagClick('back10', () => {
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchrequestnew10general", props: self.matchRequest }, { capture: true }); 
        });

        self.onTagClick('submit-tpr', () => {
            console.log("MatchRequestNew20TrialPrefsController click submit-tpr")           
            let formErrors = LForms.Util.checkValidity(self.formElement)
            console.log("formErrors", formErrors);
            let formData = LForms.Util.getFormData(self.formElement); // return the whole form + ansewers in the same format needed to re-feed into LForms
            if ((!formErrors || formErrors.length == 0) && formData && formData.items && Array.isArray(formData.items)) {
                // check travel distance. Cannot be given without location.
                const locationQuestion = formData.items.find( (question) => {
                    return question && question.localQuestionCode==='location';
                });
                const travelDistanceQuestion = formData.items.find( (question) => {
                    return question && question.localQuestionCode==='travelDistance';
                });
                if (travelDistanceQuestion && locationQuestion) {
                    if (!locationQuestion.value && travelDistanceQuestion.value) {
                        if (!formErrors)
                            formErrors = [];
                        formErrors.push(`\"${travelDistanceQuestion.question}\" cannot be specified without \"${locationQuestion.question}\"`);
                    }
                }
            }
            if (formErrors && formErrors.length > 0) {
                let ul = document.createElement('div'); // ul
                formErrors.forEach( (aText) => {
                    let li = document.createElement('p'); // li
                    li.style.cssText = 'color: red; padding-left: 4em;';
                    li.appendChild(document.createTextNode(aText));
                    ul.appendChild(li);
                });
                let div = document.createElement('div');
                div.innerHTML = '<p>Please <span style="color: red;">fix the errors</span>:</p>';
                self.formErrorsElement.innerHTML = '';
                self.formErrorsElement.appendChild(div);
                self.formErrorsElement.appendChild(ul);
                self.formErrorsElement.scrollIntoView();
                return;
            }
            //console.log("Form data", formData);
            //console.log("MatchRequest", JSON.stringify(self.matchRequest));
            self.matchRequest.trialPrefs = JSON.parse(JSON.stringify(formData));
            self.matchManager.submitTrialPrefs(self.matchRequest, (err) => {
                if (err)
                    return self.showErrorToast(err);
                // show warning after navigation
                //if (self.matchRequest.trialPrefsWarning)
                //    self.showToast(self.matchRequest.trialPrefsWarning, "Warning", "danger"); // go on
                if (self.matchRequest.trialPrefsError)
                    return self.showErrorToast(self.matchRequest.trialPrefsError);
                self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchrequestnew30condition", props: self.matchRequest }, { capture: true }); 
            });
        });
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchRequestNew20TrialPrefsController processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self.formErrorsElement.innerHTML = '';
            self.matchRequest = self.getState();
            self.setState(undefined);
            if (!self.matchRequest) {
                return self.showErrorToast('Missing match request data!');
            }
            const gLoc = navigator.geolocation;
            if (gLoc) {
                gLoc.getCurrentPosition((pos) => {
                    console.log("GEO Pos", pos);
                    this.initTrialPreferences(pos.coords);
                }, (err) => {
                    console.log("GEO Error", err);
                    this.initTrialPreferences();
                })
            }
        }, {capture: true});
    }

    initTrialPreferences(coords) {
        const self = this;
        let formDef = JSON.parse(JSON.stringify(self.matchRequest.initTrialPreferences(coords)));
        //console.log("MatchRequest", JSON.stringify(self.matchRequest));
        //console.log("Before LForms", formDef);
        const formOpts =  { };
        LForms.Util.addFormToPage(formDef, self.formElement, formOpts);
        //console.log("After LForms", formDef, self.formElement);
        //console.log("MatchRequest", JSON.stringify(self.matchRequest));
    }
}