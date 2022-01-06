import {EVENT_ACTION, EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController} from "../../assets/pdm-web-components/index.esm.js";

/**
 * New Match Request - Trial Preferences
 */

export default class ClinicalTrialAns30ConditionController extends LocalizedController {

    matchRequest = undefined;

    formElement = undefined; // DOM element that contains the p.h.i. form

    initializeModel = () => ({
        ctrName: '',
        formErrors: undefined
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "clinicaltrialans30condition");
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
            console.log("ClinicalTrialAns30ConditionController click cancel", model, target, event);
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-clinicaltrialinfo10", props: self.matchRequest.clinicalTrial }, { capture: true });
        });

        self.onTagClick('submit-tpr', () => {
            console.log("ClinicalTrialAns30ConditionController click submit-tpr")
            let formErrors = LForms.Util.checkValidity(self.formElement)
            if (self.displayFormErrors(document, self.formErrorsElement, formErrors))
                return;
            let formData = LForms.Util.getFormData(self.formElement); // return the whole form + anserwers in the same format needed to refeed into LForms
            console.log("Form data", formData);
            self.matchRequest.condition = JSON.parse(JSON.stringify(formData));
            console.log("MatchRequest", JSON.stringify(self.matchRequest));
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-clinicaltrialans40trial", props: self.matchRequest }, { capture: true });
        });
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("ClinicalTrialAns30ConditionController processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self.formErrorsElement.innerHTML = '';
            self.matchRequest = self.getState();
            self.setState(undefined);
            if (!self.matchRequest) {
                return self.showErrorToast('Missing match request data!');
            }
            self.model.ctrName = self.matchRequest.clinicalTrial.name;
            if (self.matchRequest.trialPrefsWarning)
                self.showToast(self.matchRequest.trialPrefsWarning, "Warning", "danger", 'Close'); // show warning, but go on
            let formDef = JSON.parse(JSON.stringify(self.matchRequest.initCondition()));
            self.matchManager.envReplaceExternallyDefined(formDef.items);
            console.log("MatchRequest", JSON.stringify(self.matchRequest));
            const formOpts =  { };
            LForms.Util.addFormToPage(formDef, self.formElement, formOpts);
            console.log("After LForms", formDef, self.formElement);
        }, {capture: true});
    }
}