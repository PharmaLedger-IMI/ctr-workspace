import { LocalizedController } from "../../assets/pdm-web-components/index.esm.js";
import "../../assets/lforms/lforms.min.js";

export default class HealthInfoController extends LocalizedController {
    constructor(element, history) {
        super(element, history);
        const LocaleService = require('wizard').Services.WebcLocaleService;
        LocaleService.bindToLocale(this, "healthinfo");

        console.log("Before LForms");
        LForms.Util.addFormToPage({}, 'myFormContainer', {});
        console.log("After LForms");
    }
}