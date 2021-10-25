import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * New Match Request - General Health Information 
 */
export default class MatchRequestNew10GeneralController extends LocalizedController {

    matchRequest = undefined;
    formErrorsElement = undefined; // DOM element that contains the form errors
    formElement = undefined; // DOM element that contains the form
    
    initializeModel = () => ({
        formErrors: undefined,
        progressStepsStr: '[]',
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "matchrequestnew10general");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;
        self.formErrorsElement = self.element.querySelector('#FormErrorsContainer');
        self.formElement = self.element.querySelector('#FormContainer');
        self.model.progressStepsStr = JSON.stringify(self.model.progressSteps);

        self.onTagClick('submit-ghi', () => {
            console.log("MatchRequestNew10GeneralController click submit-ghi")
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
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchrequestnew20trialprefs", props: self.matchRequest }, { capture: true });
        });
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchRequestNew10GeneralController processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self.formErrorsElement.innerHTML = '';
            self.participantManager.newMatchRequest( (err, matchRequest) => {
                if (err)
                    return self.showErrorToast(err);
                self.matchRequest = matchRequest;
                console.log("Before LForms, matchRequest", matchRequest);
                self.matchManager.envReplaceExternallyDefined(matchRequest.ghiForm.items);
                let formDef = matchRequest.ghiForm;
                const formOpts =  { };
                LForms.Util.addFormToPage(formDef, self.formElement, formOpts);
                console.log("After LForms", formDef, self.formElement);
            });
        }, {capture: true});
    }
}