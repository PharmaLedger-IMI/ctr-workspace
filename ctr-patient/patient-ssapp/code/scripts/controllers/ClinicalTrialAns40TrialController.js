import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * New Match Request - Trial Preferences
 */

export default class ClinicalTrialAns40TrialController extends LocalizedController {

    matchRequest = undefined;

    formElement = undefined; // DOM element that contains the trial-specific. form

    initializeModel = () => ({
        ctrName: '',
        formErrors: undefined
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "clinicaltrialans40trial");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;
        self.formErrorsElement = self.element.querySelector('#FormErrorsContainer');
        self.formElement = self.element.querySelector('#FormContainer');

        self.onTagClick('back10', () => {
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-clinicaltrialans10general", props: self.matchRequest }, { capture: true }); 
        });

        self.onTagClick('back30', () => {
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-clinicaltrialans30condition", props: self.matchRequest }, { capture: true }); 
        });

        self.onTagClick('cancel', (model, target, event) => {
            console.log("ClinicalTrialAns40TrialController click cancel", model, target, event);
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-clinicaltrialinfo10", props: self.matchRequest.clinicalTrial }, { capture: true });
        });

        self.onTagClick('submit-tpr', () => {
            console.log("ClinicalTrialAns40TrialController click submit-tpr")
            let formErrors = LForms.Util.checkValidity(self.formElement)
            console.log("formErrors", formErrors);
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
            let formData = LForms.Util.getFormData(self.formElement); // return the whole form + answers in the same format needed to re-feed into LForms
            console.log("Form data", formData);
            self.matchRequest.trial = JSON.parse(JSON.stringify(formData));
            console.log("MatchRequest:", JSON.stringify(self.matchRequest));
            self.matchManager.submitMatchRequest(self.matchRequest, (err, match) => {
                if (err) {
                    console.log("TOAST", err);
                    if (typeof err === 'object'
                        && typeof err.error === 'object'
                        && err.error
                        && typeof err.error.message === 'string'
                        // the above looks like an evil nest of errors
                    )
                        return self.showErrorToast(err.error.message);
                    else
                        return self.showErrorToast(err);
                }
                self.send(EVENT_NAVIGATE_TAB, { tab: "tab-clinicaltrialans60info", props: match }, { capture: true }); 
            });
        });
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("ClinicalTrialAns40TrialController processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self.formErrorsElement.innerHTML = '';
            self.matchRequest = self.getState();
            self.setState(undefined);
            if (!self.matchRequest) {
                return self.showErrorToast('Missing match request data!');
            }
            console.log("MatchRequest:", JSON.stringify(self.matchRequest));
            self.model.ctrName = self.matchRequest.clinicalTrial.name;
            let formDef = JSON.parse(JSON.stringify(self.matchRequest.initTrial()));
            self.matchManager.envReplaceExternallyDefined(formDef.items);
            const formOpts =  { };
            LForms.Util.addFormToPage(formDef, self.formElement, formOpts);
            console.log("After LForms", formDef, self.formElement);
        }, {capture: true});
    }
}