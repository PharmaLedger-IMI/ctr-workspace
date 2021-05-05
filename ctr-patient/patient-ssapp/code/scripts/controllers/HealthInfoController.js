import { LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

export default class HealthInfoController extends LocalizedController {
    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        const LocaleService = wizard.Services.WebcLocaleService;
        LocaleService.bindToLocale(this, "healthinfo");

        let self = this;
        self.onTagClick('submit-phr', () => {
            let formData = LForms.Util.getUserData();
            console.log("Form data", formData);
        });


        console.log("Before LForms");
        let formDef = wizard.FormDefs.LOINC_PHR;
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
        LForms.Util.addFormToPage(formDef, 'PhrFormContainer');
        console.log("After LForms");
    }
}