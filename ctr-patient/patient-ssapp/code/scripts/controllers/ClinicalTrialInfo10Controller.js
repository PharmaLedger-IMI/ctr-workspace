import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Trial details
 */
export default class ClinicalTrialInfo10Controller extends LocalizedController {
    
    initializeModel = () => ({
        ctr: { name: "?" }
    }); // uninitialized blank model

    map = undefined;

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "clinicaltrialinfo10");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;

        self.on(EVENT_REFRESH, (evt) => {
            console.log("ClinicalTrialInfo10Controller processing " + EVENT_REFRESH, self.getState());
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self.model.ctr = self.getState();
            //console.log("ctr", self.model.ctr);
            //console.log("condition", self.model.ctr.clinicalTrialMedicalConditions[0].medicalCondition.name);
            self.setState(undefined);

            if (this.map !== undefined) {
                try {
                    this.map.off();
                    this.map.remove();
                } catch (e) {
                    console.error('clinicalTrial.map error ', e);
                }
            }
            const location = self.model.ctr.clinicalSite.address.location;
            this.map = this.buildMap(location.latitude, location.longitude);
            setTimeout(() => this.map.invalidateSize(), 100);
        }, {capture: true});
    }

    buildMap(lat, long) {
        const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        const map = L.map('clinical-site-map', {
            center: [lat, long],
            zoom: 15,
            minZoom: 12,
            maxZoom: 17,
            dragging: false,
            scrollWheelZoom: 'center',
            layers: [baseLayer]
        });
        L.marker([lat, long]).addTo(map);
        map.setMaxBounds([[-90, -180], [90, 180]]);
        return map;
    }
}