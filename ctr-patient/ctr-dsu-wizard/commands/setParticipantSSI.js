/**
 * @module ctr-dsu-wizard.commands
 */

 const Participant = require('../model/Participant');

/**
 * Creates a seedSSI meant to contain participant 'participant' data.
 * could be used as an identity.
 * If participant.id is undefined, it will be set uwing the generateDID() method.
 * @param {Participant} participant
 * @param {string} domain: anchoring domain
 * @returns {SeedSSI} (template)
 */
function createParticipantSSI(participant, domain) {
    console.log("New Participant_SSI in domain", domain);
    const openDSU = require('opendsu');
    const keyssiSpace = openDSU.loadApi("keyssi");
    if (!participant.id) {
        const aDidStr = (new Participant()).generateDID(participant);
        participant.id = aDidStr;
    }
    return keyssiSpace.buildTemplateSeedSSI(domain, participant.id, undefined, 'v0', undefined);
}

/**
 * Registers the endpoint on the api-hub's dsu-wizard.
 * @param {HttpServer} server
 */
function command(server){
    const setSSI = require('../../pdm-dsu-toolkit/commands/setSSI');
    setSSI(server, "participant", createParticipantSSI, "setParticipantSSI", "ctr");
}

module.exports = {
    command,
    createParticipantSSI: createParticipantSSI
};
