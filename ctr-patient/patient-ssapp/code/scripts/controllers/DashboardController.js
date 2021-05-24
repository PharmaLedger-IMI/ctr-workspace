import { LocalizedController, EVENT_NAVIGATE_TAB, EVENT_REFRESH } from "../../assets/pdm-web-components/index.esm.js";

export default class DashboardController extends LocalizedController {

    initializeModel = () => ({
        participant: undefined
    });

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "dashboard");
        this.participantManager = wizard.Managers.getParticipantManager();

        let self = this;

        self.model = this.initializeModel();

        self.on(EVENT_REFRESH, (evt) => {
            console.log("DashboardController processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            this.participantManager.getIdentity((err, participant) => {
                this.model['participant'] = participant;
            });
        }, {capture: true});
        
        self.onTagEvent('findatrial', 'click', () => {
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchrequestnew10general" }, { capture: true });
        });

        self.onTagEvent('browsetrials', 'click', () => {
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-browsetrials" }, { capture: true });
        });
    }
}