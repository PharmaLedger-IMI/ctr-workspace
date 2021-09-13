import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * New Match Request - Trial Preferences
 */

export default class MatchRequestNew30ConditionController extends LocalizedController {

    matchRequest = undefined;

    formElement = undefined; // DOM element that contains the p.h.i. form

    initializeModel = () => ({
      formErrors: undefined
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "matchrequestnew30condition");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;
        self.formErrorsElement = self.element.querySelector('#FormErrorsContainer');
        self.formElement = self.element.querySelector('#FormContainer');

        self.onTagClick('back10', () => {
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchrequestnew10general", props: self.matchRequest }, { capture: true }); 
        });

        self.onTagClick('back20', () => {
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchrequestnew20trialprefs", props: self.matchRequest }, { capture: true }); 
        });

        self.onTagClick('submit-tpr', () => {
            console.log("MatchRequestNew30ConditionController click submit-tpr")
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
            let formData = LForms.Util.getFormData(self.formElement); // return the whole form + anserwers in the same format needed to refeed into LForms
            console.log("Form data", formData);
            self.matchRequest.condition = JSON.parse(JSON.stringify(formData));
            console.log("MatchRequest", JSON.stringify(self.matchRequest));
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchrequestnew40trial", props: self.matchRequest }, { capture: true });
        });
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchRequestNew30ConditionController processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self.formErrorsElement.innerHTML = '';
            self.matchRequest = self.getState();
            self.setState(undefined);
            if (!self.matchRequest) {
                return self.showErrorToast('Missing match request data!');
            }
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