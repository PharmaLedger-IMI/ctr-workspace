import { EVENT_AUTH_CLINICAL_SITE_CONTACT, EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Trial details
 */
export default class ClinicalTrialAns60InfoController extends LocalizedController {

    matchConfidenceDonutElement = undefined; // DOM element that contains the match confidence donut
    eligibilityCriteriaElement = undefined; // DOM element that contains the eligibility criteria
    
    match = undefined;

    initializeModel = () => ({
        mtct: { clinicalTrial: { name: "?", eligibilityCriteria: "?", clinicalTrialMedicalConditions: [] }, criteriaCount: 0, criteriaMatchedCount:0 },
        matchStyle: "display: block;",
        noMatchStyle: "display: block;",
        patientIdentity: "",
        disableClinicalContact: true,
        disableClinicalContactReason: "",
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "matchrequestnew60info");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);
        this.applicationManager = wizard.Managers.getApplicationManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;

        self.matchConfidenceDonutElement = self.element.querySelector('#matchConfidenceDonut');
        self.eligibilityCriteriaElement = self.element.querySelector('#eligibilityCriteria');

        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchRequestNew60InfoController processing " + EVENT_REFRESH, self.getState());
            evt.preventDefault();
            evt.stopImmediatePropagation();
            const props = self.getState();
            self.match = JSON.parse(JSON.stringify(props));
            const mtct = props.matchResult.trials[0];
            self.matchManager.enrichMatchResultClinicalTrial(mtct);
            self.model.mtct = JSON.parse(JSON.stringify(mtct));

            // set match confidence donut percentage
            if (/^[0-9]+[.]?[0-9]*$/.test(mtct.matchConfidenceToDisplay) && mtct.matchConfidenceToDisplay>0.0) {
                self.model.matchStyle = "";
                self.model.noMatchStyle = "display: none;";
                self.model.disableClinicalContact = false;
                self.matchConfidenceDonutElement.setAttribute("stroke-dasharray", ""+mtct.matchConfidenceToDisplay+",100");
            } else {
                self.model.matchStyle = "display: none;";
                self.model.noMatchStyle = "display: block;";
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
            const location = self.model.mtct.clinicalTrial.clinicalSite.address.location;
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
            //console.log("condition", self.model.mtct.clinicalTrial.clinicalTrialMedicalConditions[0].medicalCondition.name);
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
                matchRequest: self.match.matchRequestConstSSIStr,
            };
            console.log('ClinicalTrialAns60InfoController authorize-clinical-site-contact application=', application);

            self.applicationManager.submitApplication(application, (err, res) => {
                console.log('ClinicalTrialAns60InfoController applicationManager.submitApplication response=', err, res);
                if (err) {
                    return self.showErrorToast(err);
                }
                self.model.disableClinicalContact = true;
                self.model.disableClinicalContactReason = `Site contacted on ${res.createdOnStr}`;
                return self.showToast(`Your clinical trial application no. ${res.id.slice(0, 8)} has been submitted.`, 'Successfull');
            });
        }, { capture: true });

        self.onTagClick('goback', (model, target, event) => {
            console.log("MatchRequestNew60InfoController click goback", model, target, event);
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-browsetrials" }, { capture: true }); 
        });
    }
}