/**
 * @module ctr-dsu-wizard.services
 */
const {INBOX_MOUNT_PATH, INFO_PATH, PERSONAL_HEALTH_INFO_PATH, PUBLIC_ID_MOUNT_PATH} = require('../constants');
const utils = require('../../pdm-dsu-toolkit/services/utils');

/**
 * @param {string} domain: anchoring domain. defaults to 'default'
 * @param {strategy} strategy
 */
function ParticipantService(domain, strategy){
    const strategies = require("../../pdm-dsu-toolkit/services/strategy");

    let isSimple = strategies.SIMPLE === (strategy || strategies.SIMPLE);
    domain = domain || "default";

    /**
     * Creates an Participant's DSU, including the const and MQ.
     * @param {Participant} participant
     * @param {object} [inbox] - optional initial inbox contents.
     * @param {function(err, participantKeySSI)} callback
     */
    this.create = function(participant, inbox, callback){
        if (!inbox)
            inbox = {};
        if (!callback) {
            callback = inbox;
            inbox = {};
        }
        if (typeof callback != "function")
            throw new Error("callback must be a function!");
        if (isSimple){
            createSimple(participant, inbox, callback);
        } else {
            throw new Error("Not implemented"); // createAuthorized(order, callback);
        }
    }

    let createSimple = function (participant, inbox, callback) {
        let participantKeyGenFunction = require('../commands/setParticipantSSI').createParticipantSSI;
        let participantConstKeyGenFunction = require('../commands/setParticipantConstSSI').createParticipantConstSSI;
        let participantTemplateKeySSI = participantKeyGenFunction(participant, domain);
        let participantConstTemplateKeySSI = participantConstKeyGenFunction(participant, domain);
        // Test of the const already exists for the given participant.id.
        // Commented out because error messages are not very good!
        // Let it fail on creating a dup const.
        //
        // TODO better error message for duplicate id ?
        //
        //const openDSU = require('opendsu');
        //const resolver = openDSU.loadApi("resolver");
        //resolver.loadDSU(participantConstTemplateKeySSI, undefined, (err, participantConstDsu) => {
        //    console.log("loadDSU error", err);
        //    if (!err) {
        //        callback("There is already a ParticipantConst DSU id=" + participant.id);
        //    }
        //
        // Create the const first. As it is non-transactional, if it fails, stop right away.
        utils.selectMethod(participantConstTemplateKeySSI)(participantConstTemplateKeySSI, (err, participantConstDsu) => {
            if (err)
                return callback(err);
            participantConstDsu.getKeySSIAsObject((err, participantConstKeySSI) => {
                if (err)
                    return callback(err);
                console.log("participantConstKeySSI ", participantConstKeySSI.getIdentifier());
                participantConstDsu.writeFile(INFO_PATH, JSON.stringify({ id: participant.id }), (err) => {
                    if (err)
                        return callback(err);
                    utils.selectMethod(participantTemplateKeySSI)(participantTemplateKeySSI, (err, participantDsu) => {
                        if (err)
                            return callback(err);
                        participantDsu.writeFile(INFO_PATH, JSON.stringify(participant), (err) => {
                            if (err)
                                return callback(err);
                            participantDsu.getKeySSIAsObject((err, participantKeySSI) => {
                                if (err)
                                    return callback(err);
                                participantDsu.mount(PUBLIC_ID_MOUNT_PATH, participantConstKeySSI.getIdentifier(), (err) => {
                                    if (err)
                                        return callback(err);
                                    callback(undefined, participantKeySSI);
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    
    /**
     * Locate the const DSU of a participant, given the id.
     * @param {string} id - a Participant.id
     * @param {function(err, participantConstDsu)} callback
     */
    this.locateConstDSU = function(id, callback) {
        const opendsu = require("opendsu");
        const resolver = opendsu.loadApi("resolver");
        const participantConstKeyGenFunction = require('../commands/setParticipantConstSSI').createParticipantConstSSI;
        const participantConstKeySSI = participantConstKeyGenFunction({id: id}, domain);
        resolver.loadDSU(participantConstKeySSI, (err, participantConstDsu) => {
            if (err)
                return callback(err);
            callback(undefined, participantConstDsu);
        });
    };
    
    /**
     * If this patient has personal health information, gives it to the callback.
     * Otherwise, the second callback argument is called with undefined.
     * @param {DSUStorage} participantDsu
     * @param {function(err, object)} callback
     * @returns {undefined}
     */
    this.readPersonalHealthInfo = function (participantDsu, callback) {
        participantDsu.listFiles("/", { recursive: false }, (err, files) => {
            console.log("readPersonalHealthInfo listFiles", err, files);
            if (err)
                return callback(err);
            if (files.length <= 0)
                return callback(undefined, undefined);
            if (!files.includes(PERSONAL_HEALTH_INFO_PATH.substring(1)))
                return callback(undefined, undefined);
            participantDsu.readFile(PERSONAL_HEALTH_INFO_PATH, (err, buffer) => {
                if (err)
                    return callback(err);
                callback(undefined, JSON.parse(buffer.toString()));
            });
        });
    };

    /**
     * Write (or overwrite) the personal health record information.
     * @param {DSUStorage} participantDsu
     * @param {object} phi an object that will be converted with JSON.stringify.
     * @param {function(err)} callback
     * @returns {undefined}
     */
    this.writePersonalHealthInfo = function (participantDsu, phi, callback) {
        participantDsu.writeFile(PERSONAL_HEALTH_INFO_PATH, JSON.stringify(phi), (err) => {
            callback(err);
        });
    };
};

module.exports = ParticipantService;