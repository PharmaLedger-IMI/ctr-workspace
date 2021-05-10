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
                let formData = LForms.Util.getUserData(self.formElement);
                console.log("Form data", formData);
                self.participantManager.writePersonalHealthInfo(formData, (err) => {
                    if (err) {
                        console.log("Failed writing P.H.I.", err);
                        return self.showErrorToast(err);
                    }
                    self.model.participant.personalHealthInfo = formData;
                    console.log("Navigate to tab-dashboard");
                    self.send(EVENT_NAVIGATE_TAB, { tab: "tab-dashboard" }, {capture: true});  
                });
            };
        });
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("HealthInfoController processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            this.participantManager.getIdentity((err, participant) => {
                console.log("Before LForms, participant", participant);
                this.model['participant'] = participant;
                let formDef = this.model.toObject().participant.personalHealthInfo;
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
        }, {capture: true});
    }
}