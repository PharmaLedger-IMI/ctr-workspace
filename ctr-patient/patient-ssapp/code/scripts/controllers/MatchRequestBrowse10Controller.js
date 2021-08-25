import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Browse previously submitted MatchRequests
 */
export default class MatchRequestBrowse10Controller extends LocalizedController {
    

    initializeModel = () => ({
        participant: undefined,
        matches: [ {submittedOnStr: '?', conditionStr: '?', locationStr: '?'} ]
    });

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "matchrequestbrowse10");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        let self = this;

        self.model = this.initializeModel();

        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchRequestBrowse10Controller processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            this.matchManager.getAll(false, {}, (err, matches) => {
                this.model['matches'] = matches;
            });
        }, {capture: true});

        self.onTagClick('learnmore', (model, target, event) => {
            console.log("MatchRequestBrowse10Controller click learnmore", model, target, event);
            const props = model;
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchinfo10", props: props }, { capture: true }); 
        });
    }
}