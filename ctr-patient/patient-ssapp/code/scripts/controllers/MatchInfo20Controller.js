import { EVENT_AUTH_CLINICAL_SITE_CONTACT, EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Trial details - just like ClinicalTrialInfo10Controller but navigates back to MatchInfo10Controller.
 */
export default class MatchInfo20Controller extends LocalizedController {

    matchPlusMtct = undefined;
    topCardElement = undefined; // DOM element that contains the top CONTACT SITE button
    matchConfidenceDonutElement = undefined; // DOM element that contains the match confidence donut
    eligibilityWrapperElement = undefined; // DOM element that wraps the eligibility criteria
    eligibilityCriteriaElement = undefined; // DOM element that contains the eligibility criteria

    initializeModel = () => ({
        ctr: { name: "?", eligibilityCriteria: "?", clinicalSites: [], clinicalTrialMedicalConditions: []},
        clinicalSite: "{}",
        mapOptions: "{}",
        mapDataSource: "[]",
        mtct: { clinicalTrial: {}, criteriaCount: 0, criteriaMatchedCount:0 },
        patientIdentity: "",
        disableClinicalContact: true,
        disableClinicalContactReason: "",
        singleSiteFlag: false,
        multiSiteFlag: false,
        multiSiteEnabledFlag: false,
        multiSiteDisabledFlag: false,
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

        self.topCardElement = self.element.querySelector('#info20topCard');
        self.matchConfidenceDonutElement = self.element.querySelector('#matchConfidenceDonut');
        self.eligibilityWrapperElement = self.element.querySelector('#eligibilityWrapper');
        self.eligibilityCriteriaElement = self.element.querySelector('#eligibilityCriteria');

        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchInfo20Controller processing " + EVENT_REFRESH, self.getState());
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self.matchPlusMtct = self.getState();
            const ctr = self.matchPlusMtct.mtct.clinicalTrial;
            const mtct = self.matchPlusMtct.mtct;
            //console.log("ctr", self.model.ctr);
            //console.log("condition", self.model.ctr.clinicalTrialMedicalConditions[0].medicalCondition.name);
            self.setState(undefined);

            // init some flags

            // set match confidence donut percentage
            if (/^[0-9]+[.]?[0-9]*$/.test(mtct.matchConfidenceToDisplay)) {
                self.model.disableClinicalContact = false;
                self.model.disableClinicalContactReason = '';
                self.matchConfidenceDonutElement.setAttribute("stroke-dasharray", ""+mtct.matchConfidenceToDisplay+",100");
            } else {
                self.model.disableClinicalContact = true;
                self.model.disableClinicalContactReason = '';
                self.matchConfidenceDonutElement.setAttribute("stroke-dasharray","0,100");
            }

            self.model.multiSiteFlag = ctr.clinicalSites
                && ctr.clinicalSites.length > 1; // never changes
            // singleSiteFlag is always the negation of multiSiteFlag
            self.model.singleSiteFlag = !self.model.multiSiteFlag;
            self.model.multiSiteEnabledFlag = self.model.multiSiteFlag && !self.model.disableClinicalContact;
            self.model.multiSiteDisabledFlag = self.model.multiSiteFlag && self.model.disableClinicalContact;

            if (mtct.criteriaExplained) {
                self.eligibilityCriteriaElement.innerHTML = '<ul class="eligibilitycriteria-group">'
                    + mtct.criteriaExplained
                    + '</ul>';
            } else {
                self.eligibilityCriteriaElement.innerHTML = '-';
            }

            self.applicationManager.getAllByClinicalTrialId(mtct.clinicalTrial.id, (err, applications) => {
                if (err) {
                    self.setDisableClinicalContact(true, `${err}`);
                    return self.showToast(err);
                }

                if (applications.length > 0) {
                    const lastApplication = applications[applications.length-1];
                    if (!!lastApplication) {
                        self.setDisableClinicalContact(true, `${lastApplication.clinicalSiteName} contacted on ${lastApplication.createdOnStr}`);
                    } // else - do not disable contact - it might be disabled for no match
                }
            });

            // map web component data
            const coordObjArray = [];
            ctr.clinicalSites.forEach( (cs) => {
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

            self.participantManager.getIdentity((err, participant) => {
                self.model.patientIdentity = JSON.stringify({
                    name: `${participant['firstname']} ${participant['lastname']}`.trim(),
                    email: participant.email
                });
                ctr.clinicalSites.forEach((cs) => {
                    // replicate all data necessary for the contact-clinical-site-button for each array element
                    cs.clinicalSite = JSON.stringify(cs);
                    cs.clinicalSiteDisplayContact = self.model.multiSiteFlag;
                    cs.patientIdentity = self.model.patientIdentity;
                    cs.disableClinicalContact = self.model.disableClinicalContact;
                });
                self.model.ctr = JSON.parse(JSON.stringify(ctr));
                self.model.mtct = JSON.parse(JSON.stringify(mtct));
                self.model.clinicalSite = JSON.stringify(ctr.clinicalSite);
            });

            //console.log("ctr", self.model.ctr);
            //console.log("condition", self.model.ctr.clinicalTrialMedicalConditions[0].medicalCondition.name);
            self.setState(undefined);
        }, {capture: true});

        self.on(EVENT_AUTH_CLINICAL_SITE_CONTACT, (evt) => {
            if (self.model.disableClinicalContact) {
                return;
            }
            const csId = evt.detail.clinicalSiteId;
            const csName = evt.detail.clinicalSiteName;
            const patientName = evt.detail.name;
            const patientEmail = evt.detail.email;
            if (!csId || !csName) {
                return self.showErrorToast("Please select a clinical site for contact!");
            }
            if (!patientName || !patientEmail) {
                return self.showErrorToast("Please provide a name and email address!");
            }
            const { id, name, sponsor, clinicalTrialMedicalConditions } = self.model.mtct.clinicalTrial;
            const application = {
                name: patientName,
                email: patientEmail,
                clinicalTrial: id,
                clinicalTrialName: name,
                clinicalSite: csId,
                clinicalSiteName: csName,
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
                self.setDisableClinicalContact(
                    true,
                    `${application.clinicalSiteName} contacted on ${res.createdOnStr}`);
                if (self.topCardElement) // scroll back to now disabled top contact button
                    self.topCardElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                return self.showToast(`Your clinical trial application no. ${res.id.slice(0, 8)} has been submitted.`, 'Successfull');
            });
        }, { capture: true });

        self.onTagClick('goback', (model, target, event) => {
            console.log("MatchInfo20Controller click goback", model, target, event);
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-matchinfo10", props: self.matchPlusMtct.match }, { capture: true }); 
        });
    }

    setDisableClinicalContact(flagValue, reason) {
        const self = this;
        console.log("disableClinicalContact="+flagValue+" reason: "+reason);
        self.model.disableClinicalContact = flagValue;
        self.model.ctr.clinicalSites.forEach( (cs) => {
            cs.disableClinicalContact = self.model.disableClinicalContact;
        });
        self.model.disableClinicalContactReason = reason;
        self.model.multiSiteEnabledFlag = self.model.multiSiteFlag && !self.model.disableClinicalContact;
        self.model.multiSiteDisabledFlag = self.model.multiSiteFlag && self.model.disableClinicalContact;
    }
}