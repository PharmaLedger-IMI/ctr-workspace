import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

export default class HealthInfoController extends LocalizedController {

    formElement = undefined; // DOM element that contains the p.h.i. form

    initializeModel = () => ({
      formErrors: undefined
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        //const LocaleService = wizard.Services.WebcLocaleService;
        //LocaleService.bindToLocale(this, "healthinfo");
        super.bindLocale(this, "healthinfo");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;
        self.formErrorsElement = self.element.querySelector('#PhiFormErrorsContainer');
        self.formElement = self.element.querySelector('#PhiFormContainer');

        self.onTagClick('submit-phi', () => {
            console.log("HealthInfoController click submit-phi")
            let formErrors = LForms.Util.checkValidity(self.formElement)
            console.log("formErrors", formErrors);
            if (formErrors && formErrors.length > 0) {
                let ul = document.createElement('div'); // ul
                formErrors.forEach( (aText) => {
                    let li = document.createElement('p'); // li
                    li.style.cssText = 'color: #E60B2F; padding-left: 4em;';
                    li.appendChild(document.createTextNode(aText));
                    ul.appendChild(li);
                });
                let div = document.createElement('div');
                div.innerHTML = '<p>Sorry, you can only update your information <span style="color: #E60B2F;">fixing the errors</span>:</p>';
                self.formErrorsElement.innerHTML = '';
                self.formErrorsElement.appendChild(div);
                self.formErrorsElement.appendChild(ul);
                self.formErrorsElement.scrollIntoView();
                return;
            }
            let formData = LForms.Util.getFormData(self.formElement); // return the whole form + anserwers in the same format needed to refeed into LForms
            console.log("Form data", formData);
            self.participantManager.writePersonalHealthInfo(formData, (err) => {
                if (err) {
                    console.log("Failed writing P.H.I.", err);
                    return self.showErrorToast(err);
                }
                console.log("Written formData stringifyed", JSON.stringify(formData));
                self.model.participant.personalHealthInfo = formData;
                console.log("Navigate to tab-dashboard after storing formData", self.model.participant.personalHealthInfo);
                self.send(EVENT_NAVIGATE_TAB, { tab: "tab-dashboard" }, { capture: true });
            });
        });
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("HealthInfoController processing " + EVENT_REFRESH);
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
                    if (!formDef) {
                        // undefined means that the user has not saved any GHI form yet.
                        // Deep-clone it for use with LForms.
                        formDef = JSON.parse(JSON.stringify(wizard.FormDefs.GHI));
                        self.matchManager.envReplaceExternallyDefined(formDef.items);
                    }
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