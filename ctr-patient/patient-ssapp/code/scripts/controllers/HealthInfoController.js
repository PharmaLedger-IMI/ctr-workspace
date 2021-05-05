import { LocalizedController } from "../../assets/pdm-web-components/index.esm.js";
//import "../../assets/lforms/lforms.min.js";

export default class HealthInfoController extends LocalizedController {
    constructor(element, history) {
        super(element, history);
        const LocaleService = require('wizard').Services.WebcLocaleService;
        LocaleService.bindToLocale(this, "healthinfo");

        console.log("Before LForms");

        let formDef = {
            code: "X-001",
            name: "Demo form",
            items: [{
              "questionCode": "X-002",
              "question": "Eye color"
            }],
            templateOptions:{viewMode: 'lg'}
          };

        LForms.Util.addFormToPage(formDef, 'myFormContainer');
        console.log("After LForms");
    }
}