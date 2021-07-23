import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Trial details
 */
export default class MatchRequestNew60InfoController extends LocalizedController {
    
    match = undefined;

    initializeModel = () => ({
        mtct: { clinicalTrial: {}, criteriaCount: 0, criteriaMatchedCount:0 }
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "matchrequestnew60info");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;

        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchRequestNew60InfoController processing " + EVENT_REFRESH, self.getState());
            evt.preventDefault();
            evt.stopImmediatePropagation();
            let props = self.getState();
            self.match = JSON.parse(JSON.stringify(props.match));
            self.model.mtct = props.mtct;
            //console.log("ctr", self.model.ctr);
            //console.log("condition", self.model.mtct.clinicalTrial.clinicalTrialMedicalConditions[0].medicalCondition.name);
            self.setState(undefined);
        }, {capture: true});

        self.onTagClick('goback', (model, target, event) => {
            console.log("MatchRequestNew60InfoController click goback", model, target, event);
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchrequestnew50complete", props: self.match }, { capture: true }); 
        });
    }
}