/**
 * @module ctr-dsu-wizard.commands
 */

/**
 * Creates a seedSSI meant to contain Application data.
 * @param {Application} application. Must have a valid id property.
 * @param {string} domain: anchoring domain
 * @returns {SeedSSI} (template)
 */
function createApplicationConstSSI(application, domain) {
    console.log("New ApplicationConst_SSI in domain", domain);
    const openDSU = require('opendsu');
    const keyssiSpace = openDSU.loadApi("keyssi");
    if (!application.id)
        throw 'Application must have id';
    return keyssiSpace.createArraySSI(domain, [application.id]);
}

/**
 * Registers the endpoint on the api-hub's dsu-wizard.
 * @param {HttpServer} server
 */
function command(server) {
    const setSSI = require('../../pdm-dsu-toolkit/commands/setSSI');
    setSSI(server, 'applicationConst', createApplicationConstSSI, 'setApplicationConstSSI', 'ctr');
}

module.exports = {
    command,
    createApplicationConstSSI: createApplicationConstSSI
};
