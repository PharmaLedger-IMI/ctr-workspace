/**
 * @module ctr-dsu-wizard.model
 */

/**
 * Clinical Trials Applications,  that the patient wants to be contacted by the sponsor after matching requirements
 */
class Application {
    id = undefined;
    name = undefined;
    email = undefined;
    phone = undefined;
    clinicalTrial = undefined;
    clinicalTrialName = undefined;
    clinicalSite = undefined;
    clinicalSiteName = undefined;
    sponsorName = undefined;
    medicalConditionName = undefined;
    matchConfidence = undefined;
    createdOn = undefined;
    createdOnStr = undefined;

    matchRequest = undefined;
    constKeySSIStr = undefined;

    /**
     *  Initialize fields.
     * @param { {
     * id: uuid,
     * name: string,
     * email: string,
     * phone: string,
     * matchRequest: string,
     * clinicalTrial: string,
     * clinicalTrialName: string,
     * clinicalSite: string,
     * clinicalSiteName: string,
     * sponsorName: string,
     * medicalConditionName: string,
     * matchConfidence: string,
     * createdOn: Date,
     * createdOnStr: string,
     * constKeySSIStr: string
     * }} application
     */
    constructor(application) {
        if (application) {
            this.id = application.id;
            this.name = application.name;
            this.email = application.email;
            this.phone = application.phone;
            this.matchRequest = application.matchRequest;
            this.clinicalTrial = application.clinicalTrial;
            this.clinicalTrialName = application.clinicalTrialName;
            this.clinicalSite = application.clinicalSite;
            this.clinicalSiteName = application.clinicalSiteName;
            this.sponsorName = application.sponsorName;
            this.medicalConditionName = application.medicalConditionName;
            this.matchConfidence = application.matchConfidence;
            this.createdOn = application.createdOn instanceof Date ? application.createdOn : new Date(application.createdOn);
            this.createdOnStr = this.createdOn.toLocaleString();
            this.constKeySSIStr = application.constKeySSIStr;
        }
    }
}

module.exports = Application;