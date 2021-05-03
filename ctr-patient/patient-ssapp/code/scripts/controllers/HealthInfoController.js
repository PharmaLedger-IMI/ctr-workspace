import { LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

export default class HealthInfoController extends LocalizedController {
    constructor(element, history) {
        super(element, history);
        const LocaleService = require('wizard').Services.WebcLocaleService;
        LocaleService.bindToLocale(this, "healthinfo");
    }
}