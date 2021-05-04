/**
 * @module ctr-dsu-wizard.model
 */
const { Validatable } = require('../../pdm-dsu-toolkit/model/Validations');

class Participant extends Validatable{
    firstname = ""; // not camel case because of ionic field names :-(
    lastname = "";
    email = "";

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
}

module.exports = Participant;