/**
 * @module ctr-dsu-wizard.model
 */
const Participant = require('./Participant');

class Patient extends Participant{

    constructor(patient) {
        super(patient);
        if (typeof patient !== undefined)
            for (let prop in patient)
                if (patient.hasOwnProperty(prop))
                    this[prop] = patient[prop];
    }
}

module.exports = Patient;