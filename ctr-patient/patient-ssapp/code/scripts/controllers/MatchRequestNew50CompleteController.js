import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * New Match Request - Trial Preferences
 */

export default class MatchRequestNew50CompleteController extends LocalizedController {

    match = undefined;

    initializeModel = () => ({
        matchedTrials: [],
        match: { submittedOnStr: '' },
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
            self.match = JSON.parse(JSON.stringify(self.getState()));
            self.model.matchedTrials = [];
            self.model.match = self.getState();
            self.setState(undefined);
            if (!self.model.match) {
                return self.showErrorToast('Missing match data!');
            }
            console.log("Sending to backoffice", self.match);
            if (self.match.matchResult
                && self.match.matchResult.trials
                && Array.isArray(self.match.matchResult.trials)
            ) {
                let mtctCollection = [];
                self.match.matchResult.trials.forEach((mtct) => {
                    if (mtct.criteriaMatchedCount >= mtct.criteriaCount) {
                        mtct.matchConfidenceToDisplay = ((mtct.criteriaConfidenceCount / mtct.criteriaCount)*100.0).toFixed(1); // webcardinal seems unable to support complex @expressions so we calculate it here.
                        if (mtct.clinicalTrial.travDistMiles) {
                            mtct.clinicalTrial.travDistKm = (Math.round(mtct.clinicalTrial.travDistMiles * 1.60934 * 100) / 100).toFixed(2);
                        }
                        mtctCollection.push(mtct);
                    }
                });
                // sort by ascending travelDistanceKm, and then by descendant matchConfidenceToDisplay
                mtctCollection.sort((mtct1, mtct2) => {
                    if (mtct1.clinicalTrial.travDistKm && mtct2.clinicalTrial.travDistKm) {
                        let travDistKmDiff = mtct1.clinicalTrial.travDistKm - mtct2.clinicalTrial.travDistKm;
                        if (travDistKmDiff != 0) {
                            return travDistKmDiff;
                        }
                    }
                    return mtct2.matchConfidenceToDisplay - mtct1.matchConfidenceToDisplay;
                });
                self.model.matchedTrials = mtctCollection;
            }
        }, {capture: true});

        self.onTagClick('learnmore', (model, target, event) => {
            console.log("MatchRequestNew50CompleteController click learnmore", model, target, event);
            const props = { match: self.match, mtct: model };
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchrequestnew60info", props: props }, { capture: true }); 
        });
    }
}