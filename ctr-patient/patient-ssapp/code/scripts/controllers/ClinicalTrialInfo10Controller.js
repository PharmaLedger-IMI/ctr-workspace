import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Trial details
 */
export default class ClinicalTrialInfo10Controller extends LocalizedController {

    eligibilityWrapperElement = undefined; // DOM element that wraps the eligibility criteria
    eligibilityCriteriaElement = undefined; // DOM element that contains the eligibility criteria

    initializeModel = () => ({
        ctr: { name: "?", eligibilityCriteria: "?", clinicalTrialMedicalConditions: []},
        mapOptions: "{}",
        mapDataSource: "[]",
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "clinicaltrialinfo10");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;

        self.eligibilityWrapperElement = self.element.querySelector('#eligibilityWrapper');
        self.eligibilityCriteriaElement = self.element.querySelector('#eligibilityCriteria');

        self.on(EVENT_REFRESH, (evt) => {
            console.log("ClinicalTrialInfo10Controller processing " + EVENT_REFRESH, self.getState());
            evt.preventDefault();
            evt.stopImmediatePropagation();
            const ctr = self.getState();
            self.model.ctr = JSON.parse(JSON.stringify(ctr));
            //console.log("ctr", self.model.ctr);
            //console.log("condition", self.model.ctr.clinicalTrialMedicalConditions[0].medicalCondition.name);
            self.setState(undefined);

            // #19 problem with div data-if - seems that the data-if affects inner elements in weird ways
            if (ctr.eligibilityCriteria) {
                self.eligibilityWrapperElement.style.display="block";
                self.eligibilityCriteriaElement.innerHTML = ctr.eligibilityCriteria;
            } else {
                self.eligibilityWrapperElement.style.display="none";
                self.eligibilityCriteriaElement.innerHTML = "";
            }

            // map web component data
            const location = self.model.ctr.clinicalSite.address.location;
            const coord = [location.latitude, location.longitude];
            self.model.mapOptions = JSON.stringify({
                center: coord,
                zoom: 14,
                minZoom: 12,
                maxZoom: 17,
                dragging: false,
                scrollWheelZoom: 'center',
                maxBounds: [[-90, -180], [90, 180]]
            });
            self.model.mapDataSource = JSON.stringify([
                {coord},
            ]);

            //console.log("ctr", self.model.ctr);
            //console.log("condition", self.model.ctr.clinicalTrialMedicalConditions[0].medicalCondition.name);
            self.setState(undefined);
        }, {capture: true});
    }
}