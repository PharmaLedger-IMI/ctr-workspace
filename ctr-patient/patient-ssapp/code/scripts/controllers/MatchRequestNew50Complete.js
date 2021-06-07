import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * New Match Request - Trial Preferences
 */

export default class MatchRequestNew50Complete extends LocalizedController {

    matchRequest = undefined;

    initializeModel = () => ({
        keySSI: ''
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "matchrequestnew50complete");
        this.participantManager = wizard.Managers.getParticipantManager();

        this.model = this.initializeModel();

        let self = this;
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchRequestNew50Complete processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self.model.keySSI = self.getState();
            self.setState(undefined);
            if (!self.model.keySSI) {
                return self.showErrorToast('Missing match request data!');
            }
            console.log("Sending to backoffice", self.matchRequest);
        }, {capture: true});
    }
}