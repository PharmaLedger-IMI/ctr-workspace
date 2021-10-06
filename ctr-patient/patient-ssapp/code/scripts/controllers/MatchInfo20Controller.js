import { EVENT_AUTH_CLINICAL_SITE_CONTACT, EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Trial details - just like ClinicalTrialInfo10Controller but navigates back to MatchInfo10Controller.
 */
export default class MatchInfo20Controller extends LocalizedController {

    matchPlusMtct = undefined;
    matchConfidenceDonutElement = undefined; // DOM element that contains the match confidence donut
    eligibilityWrapperElement = undefined; // DOM element that wraps the eligibility criteria
    eligibilityCriteriaElement = undefined; // DOM element that contains the eligibility criteria

    initializeModel = () => ({
        ctr: { name: "?", eligibilityCriteria: "?", clinicalTrialMedicalConditions: []},
        mapOptions: "{}",
        mapDataSource: "[]",
        mtct: { clinicalTrial: {}, criteriaCount: 0, criteriaMatchedCount:0 },
        patientIdentity: "",
        disableClinicalContact: true,
        disableClinicalContactReason: "",
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "clinicaltrialinfo10");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);
        this.applicationManager = wizard.Managers.getApplicationManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;

        self.matchConfidenceDonutElement = self.element.querySelector('#matchConfidenceDonut');
        self.eligibilityWrapperElement = self.element.querySelector('#eligibilityWrapper');
        self.eligibilityCriteriaElement = self.element.querySelector('#eligibilityCriteria');

        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchInfo20Controller processing " + EVENT_REFRESH, self.getState());
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self.matchPlusMtct = self.getState();
            const ctr = this.matchPlusMtct.mtct.clinicalTrial;
            const mtct = this.matchPlusMtct.mtct;
            self.model.ctr = JSON.parse(JSON.stringify(ctr));
            self.model.mtct = JSON.parse(JSON.stringify(mtct));
            //console.log("ctr", self.model.ctr);
            //console.log("condition", self.model.ctr.clinicalTrialMedicalConditions[0].medicalCondition.name);
            self.setState(undefined);

            // set match confidence donut percentage
            if (/^[0-9]+[.]?[0-9]*$/.test(mtct.matchConfidenceToDisplay)) {
                self.model.disableClinicalContact = false;
                self.matchConfidenceDonutElement.setAttribute("stroke-dasharray", ""+mtct.matchConfidenceToDisplay+",100");
            } else {
                self.model.disableClinicalContact = true;
                self.matchConfidenceDonutElement.setAttribute("stroke-dasharray","0,100");
            }

            if (mtct.criteriaExplained) {
                self.eligibilityCriteriaElement.innerHTML = '<ul class="eligibilitycriteria-group">'
                    + mtct.criteriaExplained
                    + '</ul>';
            } else {
                self.eligibilityCriteriaElement.innerHTML = '-';
            }

            self.applicationManager.getAll(false, { query: [`clinicalTrial == ${self.model.mtct.clinicalTrial.id}`] }, (err, applications) => {
                self.model.disableClinicalContactReason = '';
                if (err) {
                    self.model.disableClinicalContact = true;
                    return self.showToast(err);
                }

                if (applications.length > 0) {
                    const appliedForCurrentTrial = applications[0];
                    self.model.disableClinicalContact = !!appliedForCurrentTrial || self.model.disableClinicalContact;
                    self.model.disableClinicalContactReason = `Site contacted on ${appliedForCurrentTrial.createdOnStr}`;
                }
            });

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

            this.participantManager.getIdentity((err, participant) => {
                this.model.patientIdentity = JSON.stringify({
                    name: `${participant['firstname']} ${participant['lastname']}`.trim(),
                    email: participant.email
                });
            });

            //console.log("ctr", self.model.ctr);
            //console.log("condition", self.model.ctr.clinicalTrialMedicalConditions[0].medicalCondition.name);
            self.setState(undefined);
        }, {capture: true});

        self.on(EVENT_AUTH_CLINICAL_SITE_CONTACT, (evt) => {
            if (self.model.disableClinicalContact) {
                return;
            }
            const { id, clinicalSite, name, sponsor, clinicalTrialMedicalConditions } = self.model.mtct.clinicalTrial;
            const application = {
                name: evt.detail.name,
                email: evt.detail.email,
                clinicalTrial: id,
                clinicalTrialName: name,
                clinicalSite: clinicalSite.id,
                sponsorName: sponsor.name,
                medicalConditionName: clinicalTrialMedicalConditions[0].medicalCondition.name,
                matchConfidence: self.model.mtct.matchConfidenceToDisplay,
                matchRequest: self.matchPlusMtct.match.matchRequestConstSSIStr,
            };
            console.log('MatchInfo20Controller authorize-clinical-site-contact  application=', application);

            self.applicationManager.submitApplication(application, (err, res) => {
                console.log('MatchInfo20Controller applicationManager.submitApplication response=', err, res);
                if (err) {
                    return self.showErrorToast(err);
                }
                self.model.disableClinicalContact = true;
                self.model.disableClinicalContactReason = `Site contacted on ${res.createdOnStr}`;
                return self.showToast(`Your clinical trial application no. ${res.id.slice(0, 8)} has been submitted.`, 'Successfull');
            });
        }, { capture: true });

        self.onTagClick('goback', (model, target, event) => {
            console.log("MatchInfo20Controller click goback", model, target, event);
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchinfo10", props: self.matchPlusMtct.match }, { capture: true }); 
        });
    }
}