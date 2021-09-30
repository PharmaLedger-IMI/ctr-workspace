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
    matchRequest = undefined;
    clinicalTrial = undefined;
    clinicalSite = undefined;
    submittedOn = undefined;
    submittedOnStr = undefined;
    constKeySSIStr = undefined;
    clinicalTrialInfo = undefined;

    /**
     *  Initialize fields.
     * @param { {
     * id: uuid,
     * name: string,
     * email: string,
     * matchRequest: string,
     * clinicalTrial: string,
     * submittedOn: string,
     * constKeySSIStr: string,
     * clinicalTrialInfo: {
     *      clinicalTrialName: string,
     *      condition: string,
     *      sponsor: string,
     *      matchConfidence: string
     * }
     * }} application
     */
    constructor(application) {
        if (application) {
            this.id = application.id;
            this.name = application.name;
            this.email = application.email;
            this.matchRequest = application.matchRequest;
            this.clinicalTrial = application.clinicalTrial;
            this.clinicalSite = application.clinicalSite;
            this.submittedOn = application.submittedOn instanceof Date ? application.submittedOn : new Date(application.submittedOn);
            this.submittedOnStr = this.submittedOn.toLocaleString();
            this.constKeySSIStr = application.constKeySSIStr;
            this.clinicalTrialInfo = application.clinicalTrialInfo;
        }
    }
}

module.exports = Application;