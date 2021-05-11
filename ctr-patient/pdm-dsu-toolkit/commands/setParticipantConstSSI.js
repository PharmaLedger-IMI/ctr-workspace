/**
 * Creates a seedSSI meant to contain participant 'participantConst' data.
 * could be used as an identity
 * @param {Participant} participant. Must have a valid id property.
 * @param {string} domain: anchoring domain
 * @returns {SeedSSI} (template)
 * @module keyssi
 */
function createParticipantConstSSI(participant, domain) {
    console.log("New ParticipantConst_SSI in domain", domain);
    const openDSU = require('opendsu');
    const keyssiSpace = openDSU.loadApi("keyssi");
    return keyssiSpace.createArraySSI(domain, [participant.id]);
}

/**
 * Registers the endpoint on the api-hub's dsu-wizard.
 * @param {HttpServer} server
 * @module server
 */
function command(server){
    const setSSI = require('../commands').setSSI;
    setSSI(server, "participantConst", createParticipantConstSSI, "setParticipantConstSSI", "ctr");
}

module.exports = {
    command,
    createParticipantConstSSI: createParticipantConstSSI
};
