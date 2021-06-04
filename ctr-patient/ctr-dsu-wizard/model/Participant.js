/**
 * @module ctr-dsu-wizard.model
 */
const { Validatable } = require('../../pdm-dsu-toolkit/model/Validations');

class Participant extends Validatable{
    firstname = ""; // not camel case because of ionic field names :-(
    lastname = "";
    email = "";
    personalHealthInfo = undefined; // an object with the Personal Health Info form

    constructor(participant){
        super();
        console.log("participant:" + participant);
        this._copyProps(participant);
    }

    _copyProps(participant){
        if (typeof participant !== undefined)
            for (let prop in participant)
                if (participant.hasOwnProperty(prop))
                    this[prop] = participant[prop];
    }

    validate() {
        const errors = [];
        if (!this.firstname)
            errors.push('First name is required.');
        if (!this.firstname)
            errors.push('Last name is required.');
        if (!this.email)
            errors.push('email is required');

        return errors.length === 0 ? true : errors;
    }

    generateViewModel() {
        return {label: this.firstname, value: this.lastname}
    }

    /**
     * Static method to generate a DID string from a Participant. (As there
     * are no JS class static methods until Safari 14.1 2020, use a regular method.)
     * @param {object} [anotherInstance] - defaults to the current instance
     * @returns a string to be used as the id of this participant
     */
    generateDID(anotherInstance) {
        if (!anotherInstance)
            anotherInstance = this;
        const aDIDStr = '' + anotherInstance.firstname+"_"+anotherInstance.lastname+"_"+anotherInstance.email.replace("@","_at_");
        return aDIDStr;
    }
}

module.exports = Participant;