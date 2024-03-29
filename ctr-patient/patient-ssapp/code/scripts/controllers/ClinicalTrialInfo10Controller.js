import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Trial details
 */
export default class ClinicalTrialInfo10Controller extends LocalizedController {

    ctr = undefined; // WebCardinal model seems to loose arrays, so we have a copy here.
    eligibilityWrapperElement = undefined; // DOM element that wraps the eligibility criteria
    eligibilityCriteriaElement = undefined; // DOM element that contains the eligibility criteria

    initializeModel = () => ({
        ctr: { name: "?", eligibilityCriteria: "?", clinicalSites: [], clinicalTrialMedicalConditions: []},
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
            self.ctr = self.getState();
            self.model.ctr = JSON.parse(JSON.stringify(self.ctr));
            //console.log("ctr", self.ctr);
            //console.log("condition", self.model.ctr.clinicalTrialMedicalConditions[0].medicalCondition.name);
            self.setState(undefined);

            // #19 problem with div data-if - seems that the data-if affects inner elements in weird ways
            if (self.ctr.eligibilityCriteria) {
                self.eligibilityWrapperElement.style.display="block";
                self.eligibilityCriteriaElement.innerHTML = self.ctr.eligibilityCriteria;
            } else {
                self.eligibilityWrapperElement.style.display="none";
                self.eligibilityCriteriaElement.innerHTML = "";
            }

            // map web component data
            /*
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
            console.log("mapOptions", self.model.mapOptions);
            const mapDataSourceStr = JSON.stringify([
                {coord}
            ]);
            console.log("mapDataSource", mapDataSourceStr);
            self.model.mapDataSource = mapDataSourceStr;
            */

            const coordObjArray = [];
            self.ctr.clinicalSites.forEach( (cs) => {
                const location = cs.address.location;
                const coord = [location.latitude, location.longitude];
                const popupContent = self.escapeHTML(cs.name);
                coordObjArray.push({
                    "coord": coord,
                    "popupContent": popupContent
                });
            });
            self.model.mapOptions = JSON.stringify({
                center: coordObjArray[0].coord,
                //zoom: 14,
                minZoom: 0,
                maxZoom: 18,
                dragging: true,
                scrollWheelZoom: 'center',
                maxBounds: [[-90, -180], [90, 180]]
            });
            self.model.mapDataSource = JSON.stringify(coordObjArray);
           
            //console.log("ctr", self.model.ctr);
            //console.log("condition", self.model.ctr.clinicalTrialMedicalConditions[0].medicalCondition.name);
            self.setState(undefined);
        }, {capture: true});

        self.onTagClick('answer', (model, target, event) => {
            console.log("ClinicalTrialInfo10Controller click complete pre-screener", model, target, event);
            // Use the this.ctr and not the model, because the webcardinal model seems to loose arrays.
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-clinicaltrialans10general", props: self.ctr }, { capture: true }); 
        });
    }
}