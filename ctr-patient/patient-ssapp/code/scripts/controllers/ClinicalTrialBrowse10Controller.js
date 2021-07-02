import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * New Match Request - General Health Information 
 */
export default class ClinicalTrialBrowse10Controller extends LocalizedController {
    
    initializeModel = () => ({
        results: []
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "clinicaltrialbrowse10");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;

        self.onTagClick('submit-query', () => {
            console.log("ClinicalTrialBrowse10Controller click submit-query")
            self.model['results'] = [];
            self.matchManager.submitFindTrials({}, (err, paginatedDto) => {
                if (err)
                    return self.showErrorToast(err);
                self.model['results'] = paginatedDto.results;
            });
        });
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("ClinicalTrialBrowse10Controller processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
        }, {capture: true});
    }
}