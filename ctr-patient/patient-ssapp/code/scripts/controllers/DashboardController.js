import { LocalizedController, EVENT_NAVIGATE_TAB, EVENT_REFRESH, EVENT_SSAPP_HAS_LOADED } from "../../assets/pdm-web-components/index.esm.js";

export default class DashboardController extends LocalizedController {

    initializeModel = () => ({
        participant: undefined,
        matches: [ {submittedOnStr: '?', conditionStr: '?', locationStr: '?'} ],
        clinicalTrialsContactShared: [],
    });

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "dashboard");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        let self = this;

        self.model = this.initializeModel();

        // record URL
        this.matchManager.envSetUrl(window.location.href);
    
        // force a refresh once the participant initialization is finished
        self.on(EVENT_SSAPP_HAS_LOADED, (evt) => {
            console.log("DashboardController processing "+EVENT_SSAPP_HAS_LOADED);
            self.send(EVENT_REFRESH, { tab: "tab-dashboard" }, {});
        }, {capture: true});

        self.on(EVENT_REFRESH, (evt) => {
            console.log("DashboardController processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            this.participantManager.getIdentity((err, participant) => {
                this.model['participant'] = participant;
                this.matchManager.getAll(false, {}, (err, matches) => {
                    this.model['matches'] = matches;
                });
            });
        }, {capture: true});
        
        self.onTagEvent('findatrial', 'click', () => {
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchrequestnew10general" }, { capture: true });
        });

        self.onTagEvent('browsetrials', 'click', () => {
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-browsetrials" }, { capture: true });
        });

        self.onTagClick('learnmore', (model, target, event) => {
            console.log("DashboardController click learnmore", model, target, event);
            const props = model;
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchinfo10", props: props }, { capture: true }); 
        });
    }
}