import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Information about a MatchRequest - list all trials.
 * TODO - this is +/- a copy of MatchRequestNew50CompleteController
 * and should be refactored to re-use most of common code + view (web components)
 */

export default class MatchInfo10Controller extends LocalizedController {

    match = undefined;

    initializeModel = () => ({
        matchedTrials: [],
        match: { submittedOnStr: '' },
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "matchinfo10");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchInfo10Controller processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self.match = JSON.parse(JSON.stringify(self.getState()));
            self.model.matchedTrials = [];
            self.model.match = self.getState();
            self.setState(undefined);
            if (!self.model.match) {
                return self.showErrorToast('Missing match data!');
            }
            if (self.match.matchResult
                && self.match.matchResult.trials
                && Array.isArray(self.match.matchResult.trials)
            ) {
                self.model.matchedTrials = self.matchManager.sortMatchResultClinicalTrial(self.match.matchResult.trials);
            }
        }, {capture: true});

        self.onTagClick('learnmore', (model, target, event) => {
            console.log("MatchInfo10Controller click learnmore", model, target, event);
            const props = { match: self.match, mtct: model };
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchinfo20", props: props }, { capture: true }); 
        });
    }
}