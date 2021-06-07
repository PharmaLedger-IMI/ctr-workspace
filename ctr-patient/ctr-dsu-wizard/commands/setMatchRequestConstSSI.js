/**
 * @module ctr-dsu-wizard.commands
 */


/**
 * Creates a seedSSI meant to contain MatchRequest data.
 * @param {MatchRequest} matchRequest. Must have a valid id property.
 * @param {string} domain: anchoring domain
 * @returns {SeedSSI} (template)
 */
function createMatchRequestConstSSI(matchRequest, domain) {
    console.log("New ParticipantConst_SSI in domain", domain);
    const openDSU = require('opendsu');
    const keyssiSpace = openDSU.loadApi("keyssi");
    if (!matchRequest.id)
        throw 'MatchRequest must have id';
    return keyssiSpace.createArraySSI(domain, [matchRequest.id]);
}

/**
 * Registers the endpoint on the api-hub's dsu-wizard.
 * @param {HttpServer} server
 */
function command(server){
    const setSSI = require('../../pdm-dsu-toolkit/commands/setSSI');
    setSSI(server, "matchRequestConst", createMatchRequestConstSSI, "setMatchRequestConstSSI", "ctr");
}

module.exports = {
    command,
    createMatchRequestConstSSI: createMatchRequestConstSSI
};
