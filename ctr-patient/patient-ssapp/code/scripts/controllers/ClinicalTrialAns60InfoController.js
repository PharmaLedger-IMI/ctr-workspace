import { EVENT_AUTH_CLINICAL_SITE_CONTACT, EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Trial details
 */
export default class ClinicalTrialAns60InfoController extends LocalizedController {

    topCardElement = undefined; // DOM element that contains the top CONTACT SITE button
    firstSiteElement = undefined; // DOM element that contains the first CONTACT SITE button for multi-site
    matchConfidenceDonutElement = undefined; // DOM element that contains the match confidence donut
    eligibilityCriteriaElement = undefined; // DOM element that contains the eligibility criteria

    match = undefined;

    initializeModel = () => ({
        clinicalSite: "{}",
        mapOptions: "{}",
        mapDataSource: "[]",
        mtct: { clinicalTrial: { name: "?", eligibilityCriteria: "?", clinicalSites: [], clinicalTrialMedicalConditions: [] }, criteriaCount: 0, criteriaMatchedCount:0 },
        matchStyle: "display: block;",
        noMatchStyle: "display: block;",
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
        super.bindLocale(this, "matchrequestnew60info");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);
        this.applicationManager = wizard.Managers.getApplicationManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;

        self.topCardElement = self.element.querySelector('#topCard');
        self.firstSiteElement = self.element.querySelector('#firstSite');
        self.matchConfidenceDonutElement = self.element.querySelector('#matchConfidenceDonut');
        self.eligibilityCriteriaElement = self.element.querySelector('#eligibilityCriteria');

        self.on(EVENT_REFRESH, (evt) => {
            console.log("MatchRequestNew60InfoController processing " + EVENT_REFRESH, self.getState());
            evt.preventDefault();
            evt.stopImmediatePropagation();
            const props = self.getState();
            self.match = JSON.parse(JSON.stringify(props));
            const mtct = props.matchResult.trials[0];
            const matchFlag = self.matchManager.enrichMatchResultClinicalTrial(mtct);

            // init some flags

            // set match confidence donut percentage
            if (matchFlag) {
                self.model.matchStyle = "";
                self.model.noMatchStyle = "display: none;";
                self.model.disableClinicalContact = false;
                self.model.disableClinicalContactReason = '';
                self.matchConfidenceDonutElement.setAttribute("stroke-dasharray", ""+mtct.matchConfidenceToDisplay+",100");
            } else {
                self.model.matchStyle = "display: none;";
                self.model.noMatchStyle = "display: block;";
                self.model.disableClinicalContact = true;
                self.model.disableClinicalContactReason = '';
                self.matchConfidenceDonutElement.setAttribute("stroke-dasharray","0,100");
            }

            self.model.multiSiteFlag = mtct.clinicalTrial
                && mtct.clinicalTrial.clinicalSites
                && mtct.clinicalTrial.clinicalSites.length > 1; // never changes
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

                // this apparently only works if it is the last thing
                if (self.topCardElement) { // scroll back to now disabled top contact button
                    self.topCardElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            });

            // map web component data
            const coordObjArray = [];
            mtct.clinicalTrial.clinicalSites.forEach( (cs) => {
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
                mtct.clinicalTrial.clinicalSites.forEach((cs) => {
                    // replicate all data necessary for the contact-clinical-site-button for each array element
                    cs.clinicalSite = JSON.stringify(cs);
                    cs.clinicalSiteDisplayContact = self.model.multiSiteFlag;
                    cs.patientIdentity = self.model.patientIdentity;
                    cs.disableClinicalContact = self.model.disableClinicalContact;
                });
                self.model.mtct = JSON.parse(JSON.stringify(mtct));
                self.model.clinicalSite = JSON.stringify(mtct.clinicalTrial.clinicalSite);
            });

            //console.log("ctr", self.model.ctr);
            //console.log("condition", self.model.mtct.clinicalTrial.clinicalTrialMedicalConditions[0].medicalCondition.name);
            self.setState(undefined);
        }, {capture: true});

        self.onTagClick("contactscroll", (evt) => {
            if (self.firstSiteElement) // scroll to first site
                self.firstSiteElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
        });

        self.on(EVENT_AUTH_CLINICAL_SITE_CONTACT, (evt) => {
            if (self.model.disableClinicalContact) {
                return;
            }
            const csId = evt.detail.clinicalSiteId;
            const csName = evt.detail.clinicalSiteName;
            const patientName = evt.detail.name;
            const patientEmail = evt.detail.email;
            const patientPhone = evt.detail.phone;
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
                phone: patientPhone,
                clinicalTrial: id,
                clinicalTrialName: name,
                clinicalSite: csId,
                clinicalSiteName: csName,
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
            console.log("MatchRequestNew60InfoController click goback", model, target, event);
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-browsetrials" }, { capture: true }); 
        });
    }

    setDisableClinicalContact(flagValue, reason) {
        const self = this;
        console.log("disableClinicalContact="+flagValue+" reason: "+reason);
        self.model.disableClinicalContact = flagValue;
        self.model.mtct.clinicalTrial.clinicalSites.forEach( (cs) => {
            cs.disableClinicalContact = self.model.disableClinicalContact;
        });
        self.model.disableClinicalContactReason = reason;
        self.model.multiSiteEnabledFlag = self.model.multiSiteFlag && !self.model.disableClinicalContact;
        self.model.multiSiteDisabledFlag = self.model.multiSiteFlag && self.model.disableClinicalContact;
    }
}