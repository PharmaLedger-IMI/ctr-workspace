import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * New Match Request - Trial Preferences
 */

export default class MatchRequestNew50CompleteController extends LocalizedController {

    match = undefined;

    initializeModel = () => ({
        match: { matchResult: { trials: [] }},
        submittedOnStr: ''
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "matchrequestnew50complete");
        this.participantManager = wizard.Managers.getParticipantManager();

        this.model = this.initializeModel();

        let self = this;
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchRequestNew50CompleteController processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            const submittedOnStr = self.getState()
                && self.getState().submittedOn
                && self.getState().submittedOn.toString();
            self.model.submittedOnStr = submittedOnStr;
            self.match = JSON.parse(JSON.stringify(self.getState()));
            self.model.match = self.getState();
            self.setState(undefined);
            if (!self.model.match) {
                return self.showErrorToast('Missing match data!');
            }
            console.log("Sending to backoffice", self.match);
        }, {capture: true});

        self.onTagClick('learnmore', (model, target, event) => {
            console.log("MatchRequestNew50CompleteController click learnmore", model, target, event);
            const props = { match: self.match, mtct: model };
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchrequestnew60info", props: props }, { capture: true }); 
        });
    }
}