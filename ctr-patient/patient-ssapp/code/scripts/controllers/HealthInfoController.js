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

        this.model = this.initializeModel();

        let self = this;
        self.formElement = self.element.querySelector('#PhiFormContainer');

        self.onTagClick('submit-phi', () => {
            console.log("HealthInfoController click submit-phi")
            self.model['formErrors'] = LForms.Util.checkValidity(self.formElement)
            console.log("formErrors", this.model.formErrors);
            if (!self.model.formErrors) {
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
                    self.send(EVENT_NAVIGATE_TAB, { tab: "tab-dashboard" }, {capture: true});  
                });
            };
        });
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("HealthInfoController processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
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
                        formDef = wizard.FormDefs.LOINC_PHR;
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
                    LForms.Util.addFormToPage(formDef, self.formElement);
                    console.log("After LForms", formDef, self.formElement);
                });
          });
        }, {capture: true});
    }
}