import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * New Match Request - General Health Information 
 */
export default class ClinicalTrialBrowse10Controller extends LocalizedController {

    queryFormElement = undefined; // DOM element that contains the search form
    resultsFormElement = undefined; // DOM element that contains the results form
    
    initializeModel = () => ({
      queryFormErrors: undefined
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "clinicaltrialbrowse10");
        this.participantManager = wizard.Managers.getParticipantManager();

        this.model = this.initializeModel();

        let self = this;
        self.queryFormElement = self.element.querySelector('#QueryFormContainer');
        self.resultsFormElement = self.element.querySelector('#ResultsContainer');

        self.onTagClick('submit-query', () => {
            console.log("ClinicalTrialBrowse10Controller click submit-query")
        });
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("ClinicalTrialBrowse10Controller processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
        }, {capture: true});
    }
}