import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Answer a pre-screener for one specific trial - General Health Information 
 */
export default class ClinicalTrialAns10GeneralController extends LocalizedController {

    matchRequest = undefined;
    formErrorsElement = undefined; // DOM element that contains the form errors
    formElement = undefined; // DOM element that contains the form
    
    initializeModel = () => ({
        ctr: { id: '', name: '?' },
        formErrors: undefined
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "clinicaltrialans10general");
        this.participantManager = wizard.Managers.getParticipantManager();

        this.model = this.initializeModel();

        let self = this;
        self.formErrorsElement = self.element.querySelector('#FormErrorsContainer');
        self.formElement = self.element.querySelector('#FormContainer');

        self.onTagClick('cancel', (model, target, event) => {
            console.log("ClinicalTrialInfo10Controller click cancel", model, target, event);
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-clinicaltrialinfo10", props: model.ctr }, { capture: true });
        });

        self.onTagClick('submit-ghi', () => {
            console.log("ClinicalTrialAns10GeneralController click submit-ghi")
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
            self.matchRequest.ghiForm = formData;
            console.log("MatchRequest", JSON.stringify(self.matchRequest));
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-clinicaltrialans30condition", props: self.matchRequest }, { capture: true });
        });
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("ClinicalTrialAns10GeneralController processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self.formErrorsElement.innerHTML = '';
            const ctr = self.getState();
            self.model.ctr = ctr;
            self.setState(undefined);
            self.participantManager.newMatchRequest( (err, matchRequest) => {
                if (err)
                    return self.showErrorToast(err);
                self.matchRequest = matchRequest;
                console.log("Before LForms, matchRequest", matchRequest);
                let formDef = matchRequest.ghiForm;
                const formOpts =  { };
                LForms.Util.addFormToPage(formDef, self.formElement, formOpts);
                console.log("After LForms", formDef, self.formElement);
            });
        }, {capture: true});
    }
}