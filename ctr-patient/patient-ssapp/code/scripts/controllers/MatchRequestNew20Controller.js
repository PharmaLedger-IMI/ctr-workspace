import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * New Match Request - Trial Preferences
 */

export default class MatchRequestNew20Controller extends LocalizedController {

    formElement = undefined; // DOM element that contains the p.h.i. form

    initializeModel = () => ({
      formErrors: undefined
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "matchrequestnew20general");
        this.participantManager = wizard.Managers.getParticipantManager();

        this.model = this.initializeModel();

        let self = this;
        self.formErrorsElement = self.element.querySelector('#FormErrorsContainer');
        self.formElement = self.element.querySelector('#FormContainer');

        self.onTagClick('submit-tpr', () => {
            console.log("MatchRequestNew20Controller click submit-tpr")
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
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchrequestnew30condition" }, { capture: true });
        });
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchRequestNew20Controller processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self.formErrorsElement.innerHTML = '';
            self.participantManager.getIdentity((err, participant) => {
                // When reading from this.model.participant.personalHealthinfo
                // it is wrapped by Proxy objects, and LFOrms seems not to work.
                // Workaround by re-reading it from DSU.
                self.participantManager.readPersonalHealthInfo((err, phi) => { 
                    console.log("Before LForms, participant, phi", participant, phi);
                    self.model['participant'] = participant;
                    //self.model.participant.personalHealthInfo = phi;
                    let formDef = phi;
                    if (!formDef)
                        formDef = wizard.FormDefs.GHI;
                    /*
                      let formDef = {
                        code: "X-001",
                        name: "Demo form",
                        items: [{
                            "questionCode": "X-002",
                            "question": "Eye color"
                        }],
                        templateOptions:{viewMode: 'lg'}
                      };
                    */
                    const formOpts =  { templateOptions: { showQuestionCode: true } };
                    LForms.Util.addFormToPage(formDef, self.formElement, formOpts);
                    console.log("After LForms", formDef, self.formElement);
                });
          });
        }, {capture: true});
    }
}