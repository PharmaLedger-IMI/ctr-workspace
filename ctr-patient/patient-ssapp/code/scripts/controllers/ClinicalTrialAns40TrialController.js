import {EVENT_ACTION, EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController} from "../../assets/pdm-web-components/index.esm.js";

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
        this.displayFormErrors = wizard.FormDefs.displayFormErrors;

        this.model = this.initializeModel();

        let self = this;
        self.formErrorsElement = self.element.querySelector('#FormErrorsContainer');
        self.formElement = self.element.querySelector('#FormContainer');
        self.model.progressStepsStr = JSON.stringify(self.model.progressSteps);

        self.on(EVENT_ACTION, (evt) => {
            if (evt.detail.data.tab)
                self.send(EVENT_NAVIGATE_TAB, { tab: evt.detail.data.tab, props: self.matchRequest }, { capture: true });
        });

        self.onTagClick('cancel', (model, target, event) => {
            console.log("ClinicalTrialAns40TrialController click cancel", model, target, event);
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-clinicaltrialinfo10", props: self.matchRequest.clinicalTrial }, { capture: true });
        });

        self.onTagClick('submit-tpr', () => {
            console.log("ClinicalTrialAns40TrialController click submit-tpr")
            let formErrors = LForms.Util.checkValidity(self.formElement)
            if (self.displayFormErrors(document, self.formErrorsElement, formErrors))
                return;
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