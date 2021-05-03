wizardRequire=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"../../../ctr-dsu-wizard":[function(require,module,exports){
(function (__dirname){(function (){
/**
 * @module ctr-dsu-wizard
 */

/**
 * iterates through all the commands in the command folder and registers them
 * Is called by the apihub via the server.json
 */
function Init(server){
	const path = require('path');
	const cmdsDir = path.join(__dirname, "commands");
	require('fs').readdir(cmdsDir, (err, files) => {
		if (err)
			throw err;
		files.filter(f => f !== 'setSSI.js' && f !== 'index.js').forEach(f => {
			require(path.join(cmdsDir, f)).command(server);
		});
	});
}

module.exports = {
	Init,
	/**
	 * Exposes constants.
	 */
	Constants: require("./constants"),
	 /**
	 * Exposes the Model module
	 */
	Model: require("./model"),
	/**
	 * exposes the Commands module
	 */
	Commands: require("./commands"),
	/**
	 * instantiates a new DSUService
	 */
	DSUService: new (require('./services').DSUService),
	/**
	 * Exposes the Services Module
	 */
	Services: require("./services"),
	/**
	 * Exposes the Managers module
	 */
	Managers: require("./managers"),
    /**
	 * Exposes Version.
	 */
	Version: require("./version"),
};

}).call(this)}).call(this,"/")

},{"./commands":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/commands/index.js","./constants":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/constants.js","./managers":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/managers/index.js","./model":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/model/index.js","./services":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/services/index.js","./version":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/version.js","fs":false,"path":false}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/builds/tmp/wizard_intermediar.js":[function(require,module,exports){
(function (global){(function (){
global.wizardLoadModules = function(){ 

	if(typeof $$.__runtimeModules["wizard"] === "undefined"){
		$$.__runtimeModules["wizard"] = require("../../../ctr-dsu-wizard");
	}
};
if (true) {
	wizardLoadModules();
}
global.wizardRequire = require;
if (typeof $$ !== "undefined") {
	$$.requireBundle("wizard");
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../../ctr-dsu-wizard":"../../../ctr-dsu-wizard"}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/commands/index.js":[function(require,module,exports){
/**
 * @module ctr-dsu-wizard.commands
 */
module.exports = {
    setSSI: require('../../pdm-dsu-toolkit/commands/setSSI'),
    createParticipantSSI: require("./setParticipantSSI").createParticipantSSI,
    createParticipantConstSSI: require("./setParticipantConstSSI").createParticipantConstSSI
}
},{"../../pdm-dsu-toolkit/commands/setSSI":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/commands/setSSI.js","./setParticipantConstSSI":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/commands/setParticipantConstSSI.js","./setParticipantSSI":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/commands/setParticipantSSI.js"}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/commands/setParticipantConstSSI.js":[function(require,module,exports){
/**
 * @module ctr-dsu-wizard.commands
 */

/**
 * Creates a seedSSI meant to contain participant 'participantConst' data.
 * could be used as an identity
 * @param {Participant} participant. Must have a valid id property.
 * @param {string} domain: anchoring domain
 * @returns {SeedSSI} (template)
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
 */
function command(server){
    const setSSI = require('../../pdm-dsu-toolkit/commands/setSSI');
    setSSI(server, "participantConst", createParticipantConstSSI, "setParticipantConstSSI", "ctr");
}

module.exports = {
    command,
    createParticipantConstSSI: createParticipantConstSSI
};

},{"../../pdm-dsu-toolkit/commands/setSSI":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/commands/setSSI.js","opendsu":false}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/commands/setParticipantSSI.js":[function(require,module,exports){
/**
 * @module ctr-dsu-wizard.commands
 */

/**
 * Creates a seedSSI meant to contain participant 'participant' data.
 * could be used as an identity
 * @param {Participant} participant
 * @param {string} domain: anchoring domain
 * @returns {SeedSSI} (template)
 */
function createParticipantSSI(participant, domain) {
    console.log("New Participant_SSI in domain", domain);
    const openDSU = require('opendsu');
    const keyssiSpace = openDSU.loadApi("keyssi");
    return keyssiSpace.buildTemplateSeedSSI(domain, participant.id + participant.name + participant.tin, undefined, 'v0', undefined);
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

},{"../../pdm-dsu-toolkit/commands/setSSI":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/commands/setSSI.js","opendsu":false}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/constants.js":[function(require,module,exports){
const ANCHORING_DOMAIN = "ctr";
const INFO_PATH = require('../pdm-dsu-toolkit/constants').INFO_PATH;
const PARTICIPANT_MOUNT_PATH = require('../pdm-dsu-toolkit/constants').PARTICIPANT_MOUNT_PATH;

const STATUS_MOUNT_PATH = '/status';

const DEFAULT_QUERY_OPTIONS = require('../pdm-dsu-toolkit/constants').DEFAULT_QUERY_OPTIONS;

module.exports = {
    ANCHORING_DOMAIN,
    DEFAULT_QUERY_OPTIONS,
    INFO_PATH,
    PARTICIPANT_MOUNT_PATH,
    PRODUCT_MOUNT_PATH
}
},{"../pdm-dsu-toolkit/constants":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/constants.js"}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/managers/ParticipantManager.js":[function(require,module,exports){
/**
 * @module ctr-dsu-wizard.managers
 */

const BaseManager = require('../../pdm-dsu-toolkit/managers/BaseManager');

/**
 * Participant Manager Class
 *
 * Manager Classes in this context should do the bridge between the controllers
 * and the services exposing only the necessary api to the controllers while encapsulating <strong>all</strong> business logic.
 *
 * All Manager Classes should be singletons.
 *
 * This complete separation of concerts is very beneficial for 2 reasons:
 * <ul>
 *     <li>Allows for testing since there's no browser dependent code (i think) since the DSUStorage can be 'mocked'</li>
 *     <li>Allows for different controllers access different business logic when necessary (while benefiting from the singleton behaviour)</li>
 * </ul>
 *
 * Should eventually integrate with the WP3 decisions
 *
 * @param {DSUStorage} dsuStorage the controllers dsu storage
 * @param {boolean} [force] defaults to false. overrides the singleton behaviour and forces a new instance.
 * Makes DSU Storage required again!
 * @param {function(err, ParticipantManager)} [callback}
 */
class ParticipantManager extends BaseManager{
    constructor(dsuStorage, force, callback) {
        super(dsuStorage, force, callback);
    };

    /**
     * Must return the string to be used to generate the DID
     * @param {object} identity
     * @param {string} participantConstSSI
     * @param {function(err, string)}callback
     * @protected
     * @override
     */
    _getDIDString(identity, participantConstSSI, callback){
        callback(undefined, identity.id + '');
    }
}

let participantManager;

/**
 * @param {DSUStorage} [dsuStorage] only required the first time, if not forced
 * @param {boolean} [force] defaults to false. overrides the singleton behaviour and forces a new instance.
 * Makes DSU Storage required again!
 * @param {function(err, ParticipantManager)} [callback]
 * @returns {ParticipantManager}
 */
const getParticipantManager = function (dsuStorage, force, callback) {
    if (!callback){
        if (typeof force === 'function'){
            callback = force;
            force = false;
        }
    }
    if (!participantManager || force) {
        if (!dsuStorage)
            throw new Error("No DSUStorage provided");
        participantManager = new ParticipantManager(dsuStorage, force, callback);
    }
    return participantManager;
}

module.exports = getParticipantManager;
},{"../../pdm-dsu-toolkit/managers/BaseManager":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/managers/BaseManager.js"}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/managers/index.js":[function(require,module,exports){
/**
 * @module ctr-dsu-wizard.managers
 */

/**
 * Manager Classes in this context should do the bridge between the controllers
 * and the services exposing only the necessary api to the controllers while encapsulating <strong>all</strong> business logic.
 *
 * All Manager Classes should be singletons.
 *
 * This complete separation of concerts is very beneficial for 2 reasons:
 * <ul>
 *     <li>Allows for testing since there's no browser dependent code (i think) since the DSUStorage can be 'mocked'</li>
 *     <li>Allows for different controllers access different business logic when necessary (while benefiting from the singleton behaviour)</li>
 * </ul>
 */
module.exports = {
    Manager: require('../../pdm-dsu-toolkit/managers/Manager'),
    getParticipantManager: require('./ParticipantManager')
}
},{"../../pdm-dsu-toolkit/managers/Manager":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/managers/Manager.js","./ParticipantManager":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/managers/ParticipantManager.js"}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/model/Participant.js":[function(require,module,exports){
/**
 * @module ctr-dsu-wizard.model
 */
const { Validatable } = require('../../pdm-dsu-toolkit/model/Validations');

class Participant extends Validatable{
    id = "";
    name = "";
    email = "";
    tin = "";
    address = "";

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
        if (!this.id)
            errors.push('id is required');
        if (!this.name)
            errors.push('Name is required.');
        if (!this.email)
            errors.push('email is required');
        if (!this.tin)
            errors.push('nif is required');

        return errors.length === 0 ? true : errors;
    }

    generateViewModel() {
        return {label: this.name, value: this.id}
    }
}

module.exports = Participant;
},{"../../pdm-dsu-toolkit/model/Validations":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/model/Validations.js"}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/model/Patient.js":[function(require,module,exports){
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
},{"./Participant":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/model/Participant.js"}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/model/index.js":[function(require,module,exports){
/**
 * @module ctr-dsu-wizard.model
 */
module.exports = {
    Participant: require('./Participant'),
    Patient: require('./Patient'),
    Validations: require('../../pdm-dsu-toolkit/model/Validations'),
    Utils: require('../../pdm-dsu-toolkit/model/Utils')
}

},{"../../pdm-dsu-toolkit/model/Utils":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/model/Utils.js","../../pdm-dsu-toolkit/model/Validations":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/model/Validations.js","./Participant":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/model/Participant.js","./Patient":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/model/Patient.js"}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/services/ParticipantService.js":[function(require,module,exports){
/**
 * @module ctr-dsu-wizard.services
 */
 const {INBOX_MOUNT_PATH, INFO_PATH, PUBLIC_ID_MOUNT_PATH} = require('../constants');
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

};

module.exports = ParticipantService;
},{"../../pdm-dsu-toolkit/services/strategy":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/strategy.js","../../pdm-dsu-toolkit/services/utils":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/utils.js","../commands/setParticipantConstSSI":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/commands/setParticipantConstSSI.js","../commands/setParticipantSSI":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/commands/setParticipantSSI.js","../constants":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/constants.js","opendsu":false}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/services/index.js":[function(require,module,exports){
/**
 * @module ctr-dsu-wizard.services
 */
module.exports = {
    DSUService: require('../../pdm-dsu-toolkit/services/DSUService'),
    ParticipantService: require('./ParticipantService'),
    WebcLocaleService: require("../../pdm-dsu-toolkit/services/WebcLocaleService"),
    WebComponentService: require("../../pdm-dsu-toolkit/services/WebComponentService"),
    Strategy: require("../../pdm-dsu-toolkit/services/strategy"),
    utils: require('../../pdm-dsu-toolkit/services/utils')
}
},{"../../pdm-dsu-toolkit/services/DSUService":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/DSUService.js","../../pdm-dsu-toolkit/services/WebComponentService":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/WebComponentService.js","../../pdm-dsu-toolkit/services/WebcLocaleService":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/WebcLocaleService.js","../../pdm-dsu-toolkit/services/strategy":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/strategy.js","../../pdm-dsu-toolkit/services/utils":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/utils.js","./ParticipantService":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/services/ParticipantService.js"}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/version.js":[function(require,module,exports){
// IMPORTANT: THIS FILE IS AUTO GENERATED BY bin/version.js - DO NOT MANUALLY EDIT OR CHECKIN!
const VERSION = {
    "dirty": true,
    "raw": "bb6abf5-dirty",
    "hash": "bb6abf5",
    "distance": null,
    "tag": null,
    "semver": null,
    "suffix": "bb6abf5-dirty",
    "semverString": null,
    "version": "0.1.0"
};

module.exports = VERSION;

},{}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/commands/setSSI.js":[function(require,module,exports){
/**
 * Registers with the DSU Wizard the provided endpoints for the various DSU types
 * @param {HttpServer} server  the server object
 * @param {string} endpoint  the endpoint to be registered
 * @param {function} factoryMethod  the method that receives a data object with the parameters required to generate the keyssi, and is responsible for the creation of the DSU
 * @param {string} methodName   the name of the method to be registered in the DSU Wizard? - Should match the method name that is calling it?
 * @param {string} [domain] domain where to anchor the DSU - defaults to 'default'
 * @module server
 */
function setSSI(server, endpoint, factoryMethod, methodName, domain){
    domain = domain || "default";
    const dsu_wizard = require("dsu-wizard");
    const commandRegistry = dsu_wizard.getCommandRegistry(server);
    const utils = dsu_wizard.utils;

    commandRegistry.register("/" + endpoint, "post", (req, callback) => {
        const transactionManager = dsu_wizard.getTransactionManager();

        utils.bodyParser(req, err => {
            if(err)
                return OpenDSUSafeCallback(callback)(createOpenDSUErrorWrapper(`Failed to parse body`, err));

            const data = JSON.parse(req.body);
            const elemSSI = factoryMethod(data, domain);

            transactionManager.getTransaction(req.params.transactionId, (err, transaction) => {
                transaction.context.keySSI = elemSSI.getIdentifier();
                transaction.context.forceNewDSU = true;                 // TODO: Why? could not find documentation
                transaction.context.options.useSSIAsIdentifier = true;  // TODO: Why? could not find documentation
                transactionManager.persistTransaction(transaction, err => {
                    if(err)
                        return callback(err);

                    const command = dsu_wizard.getDummyCommand().create(methodName);  // TODO: why?
                    return callback(undefined, command);
                });
            });
        });
    });
}

module.exports = setSSI;

},{"dsu-wizard":false}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/constants.js":[function(require,module,exports){
/**
 * Constants
 * @module constants
 */

/**
 * default info writing path in DSU's since you can't write to '/'
 */
const INFO_PATH = '/info';

/**
 * Default mount path for the participant const under the PDM SSApp Architecture
 */
const PARTICIPANT_MOUNT_PATH = "/participant";

/**
 * Default mount path for the Id DSU under the PDM SSApp Architecture
 */
const IDENTITY_MOUNT_PATH = '/id'

const DATABASE_MOUNT_PATH = '/db'

const DID_METHOD = 'demo'

const MESSAGE_REFRESH_RATE = 1000;
const MESSAGE_TABLE = 'messages'

/**
 * Default Query options to be used by the managers to query the database
 * @type {{query: string[]|undefined, limit: number|undefined, sort: string|undefined}}
 */
const DEFAULT_QUERY_OPTIONS = {
    query: ["__timestamp > 0"],
    sort: "dsc",
    limit: undefined
}

module.exports = {
    INFO_PATH,
    PARTICIPANT_MOUNT_PATH,
    IDENTITY_MOUNT_PATH,
    DATABASE_MOUNT_PATH,
    DID_METHOD,
    MESSAGE_REFRESH_RATE,
    MESSAGE_TABLE,
    DEFAULT_QUERY_OPTIONS
}
},{}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/managers/BaseManager.js":[function(require,module,exports){
/**
 * @module managers
 */

/**
 *
 */
const {INFO_PATH, PARTICIPANT_MOUNT_PATH, IDENTITY_MOUNT_PATH, DATABASE_MOUNT_PATH} = require('../constants');
const { getResolver ,getKeySSISpace,  _err} = require('../services/utils');
const relevantMounts = [PARTICIPANT_MOUNT_PATH, DATABASE_MOUNT_PATH];
const {getMessageManager, Message} = require('./MessageManager');
/**
 * Base Manager Class
 *
 * Manager Classes in this context should do the bridge between the controllers
 * and the services exposing only the necessary api to the controllers while encapsulating <strong>all</strong> business logic.
 *
 * All Manager Classes should be singletons.
 *
 * This complete separation of concerts is very beneficial for 2 reasons:
 * <ul>
 *     <li>Allows for testing since there's no browser dependent code (i think) since the DSUStorage can be 'mocked'</li>
 *     <li>Allows for different controllers access different business logic when necessary (while benefiting from the singleton behaviour)</li>
 * </ul>
 *
 * This Base Manager Class is designed to integrate with the pdm-trust-loader and a init.file configuration of
 * <pre>
 *      define $ID$ fromvar -$Identity-
 *      define $ENV$ fromvar -$Environment-
 *
 *      with cmd createdsu seed traceability specificstring
 *          define $SEED$ fromcmd getidentifier true
 *          createfile info $ID$
 *      endwith
 *      createfile environment.json $ENV$
 *      mount $SEED$ /id
 *
 *      with var $SEED$
 *          define $READ$ fromcmd derive true
 *      endwith
 *
 *      define $SECRETS$ fromcmd objtoarray $ID$
 *
 *      with cmd createdsu const traceability $SECRETS$
 *          mount $READ$ /id
 *          define $CONST$ fromcmd getidentifier true
 *      endwith
 *
 *      mount $CONST$ /participant
 *
 *      with cmd createdsu seed traceability fordb
 *          define $DB$ fromcmd getidentifier true
 *      endwith
 *
 *      mount $DB$ /db
 * </pre>
 *
 * it also integrates with the {@link DSUStorage} to provide direct access to the Base DSU by default.
 *
 * All other Managers in this architecture can inherit from this to get access to the getIdentity && getEnvironment API from the credentials set in the pdm-loader
 *
 * @param {DSUStorage} dsuStorage the controllers dsu storage
 * @param {boolean} [force] defaults to false. overrides the singleton behaviour and forces a new instance.
 * Makes DSU Storage required again!
 * @param {function(err, BaseManager)} [callback] optional callback. called after initialization. mostly for testing
 * @module managers
 * @class BaseManager
 * @abstract
 */
class BaseManager {
    constructor(dsuStorage, force, callback) {
        this.force = force;
        this.DSUStorage = dsuStorage;
        this.rootDSU = undefined;
        this.db = undefined;
        this.participantConstSSI = undefined;
        this.did = undefined;
        this.messenger = undefined;
        this.identity = undefined;
        this._getResolver = getResolver;
        this._getKeySSISpace = getKeySSISpace;
        this._err = _err;
        this._initialize((err) => {
            if (err){
                console.log(`Could not initialize base manager ${err}`);
                if(callback)
                    return callback(err);
            }
            console.log(`base manager initialized`);
            if (callback)
                callback(undefined, this);
        });
    };

    sendMessage(did, api, message, callback){
        const msg = new Message(api, message)
        this.messenger.sendMessage(did, msg, callback);
    }

    registerMessageListener(api, listener){
        const self = this;
        if (this.messenger) { // initialization done
            return this.messenger.registerListeners(api, listener);
        } else {
            console.log("Waiting for participant initialization");
            setTimeout(() => { self.registerMessageListener(api, listener); },
                100);
        }
    }

    /**
     * See {@link MessageManager#deleteMessage()}.
     */
    deleteMessage(message, callback){
        this.messenger.deleteMessage(message, callback);
    }

    /**
     * See {@link MessageManager#getMessage()}.
     */
    getMessages(api, callback){
        this.messenger.getMessages(api, callback);
    }

    /**
     * Stops the message service listener
     */
    shutdownMessenger(){
        this.messenger.shutdown();
    }

    _getRootDSU(){
        if (!this.rootDSU)
            throw new Error("ParticipantDSU not cached");
        return this.rootDSU;
    };

    _initialize(callback){
        if (this.rootDSU)
            return callback();
        let self = this;
        self.DSUStorage.enableDirectAccess(() => {
            self.rootDSU = self.DSUStorage;
            self.getIdentity((err, identity) => err
                ? self._err(`Could not get Identity`, err, callback)
                : self._cacheRelevant(callback, identity));
        });
    };

    _cleanPath(path){
        return path[0] === '/' ? path.substring(1) : path;
    }

    _verifyRelevantMounts(mounts){
        return this._cleanPath(DATABASE_MOUNT_PATH) in mounts && this._cleanPath(PARTICIPANT_MOUNT_PATH) in mounts;
    }

    _cacheRelevant(callback, identity){
        let self = this;
        this.rootDSU.listMountedDSUs('/', (err, mounts) => {
            if (err)
                return self._err(`Could not list mounts in root DSU`, err, callback);
            const relevant = {};
            mounts.forEach(m => {
                if (relevantMounts.indexOf('/' + m.path) !== -1)
                    relevant[m.path] = m.identifier;
            });
            if (!self._verifyRelevantMounts(relevant))
                return callback(`Loader Initialization failed`);
            let dbSSI = getKeySSISpace().parse(relevant[self._cleanPath(DATABASE_MOUNT_PATH)]);
            if (!dbSSI)
                return callback(`Could not retrieve db ssi`);
            dbSSI = dbSSI.derive();
            self.db = require('opendsu').loadApi('db').getWalletDB(dbSSI, 'mydb');
            self.db.on('initialised', () => {
                console.log(`Database Cached`);
                self.participantConstSSI = relevant[self._cleanPath(PARTICIPANT_MOUNT_PATH)];
                self._getDIDString(identity, self.participantConstSSI, (err, didString) => {
                    if (err)
                        throw err;
                    console.log(`DID String is ${didString}`);
                    self.messenger = getMessageManager(self, didString, self.force);
                    callback();
                });
            });
        });
    }

    /**
     * @param {string|KeySSI} keySSI
     * @param {function(err, Archive)} callback
     * @private
     */
    _loadDSU(keySSI, callback){
        let self = this;
        if (typeof keySSI === 'string'){
            try {
                keySSI = self._getKeySSISpace().parse(keySSI);
            } catch (e) {
                return self._err(`Could not parse SSI ${keySSI}`, e, callback);
            }
            return self._loadDSU(keySSI, callback);
        }
        this._getResolver().loadDSU(keySSI, callback);
    };

    /**
     * reads the participant information (if exists)
     * @param {function(err, object)} [callback] only required if the identity is not cached
     * @returns {object} identity (if cached and no callback is provided)
     */
    getIdentity(callback){
        if (this.identity){
            if (callback)
                return callback(undefined, this.identity);
            return this.identity;
        }

        let self = this;
        self.DSUStorage.getObject(`${PARTICIPANT_MOUNT_PATH}${IDENTITY_MOUNT_PATH}${INFO_PATH}`, (err, participant) => {
            if (err)
                return self._err(`Could not get identity`, err, callback);
            self.identity = participant;
            callback(undefined, participant)
        });
    };

    /**
     * Must return the string to be used to generate the DID
     * @param {object} identity
     * @param {string} participantConstSSI
     * @param {function(err, string)}callback
     * @protected
     */
    _getDIDString(identity, participantConstSSI, callback){
        throw new Error(`Subclasses must implement this`);
    }

    /**
     * Edits/Overwrites the Participant details. Should this be allowed??
     * @param {Participant} participant
     * @param {function(err)} callback
     */
    editIdentity(participant, callback) {
        let self = this;
        this._initialize(err => {
            if (err)
                return self._err(`Could not initialize`, err, callback);
            self.DSUStorage.setObject(`${PARTICIPANT_MOUNT_PATH}${INFO_PATH}`, JSON.stringify(participant), (err) => {
                if (err)
                    return callback(err);
                console.log(`Participant updated`);
                this.identity = participant;
                callback(undefined, participant);
            });
        });
    };
}

module.exports = BaseManager;
},{"../constants":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/constants.js","../services/utils":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/utils.js","./MessageManager":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/managers/MessageManager.js","opendsu":false}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/managers/Manager.js":[function(require,module,exports){
const { INFO_PATH , DEFAULT_QUERY_OPTIONS } = require('../constants');

class Page {
    itemsPerPage = 10;
    currentPage = 1;
    totalPages = undefined;
    items = [];

    constructor(page) {
        if (typeof page !== undefined)
            for (let prop in page)
                if (page.hasOwnProperty(prop))
                    this[prop] = page[prop];
    }
}

/**
 * Manager Classes in this context should do the bridge between the controllers
 * and the services exposing only the necessary api to the controllers while encapsulating <strong>all</strong> business logic.
 *
 * All Manager Classes should be singletons.
 *
 * This complete separation of concerns is very beneficial for 2 reasons:
 * <ul>
 *     <li>Allows for testing since there's no browser dependent code (i think) since the DSUStorage can be 'mocked'</li>
 *     <li>Allows for different controllers access different business logic when necessary (while benefiting from the singleton behaviour)</li>
 * </ul>
 *
 * #### _Manager SPECIFIC DataBase Access API (CRUD)_
 *
 * Methods:
 *  - {@link create} - Must be overwritten by child classes
 *  - {@link getOne}
 *  - {@link remove}
 *  - {@link update} - Should be overwritten by child classes
 *  - {@link getAll} - with querying capabilities via {@link DEFAULT_QUERY_OPTIONS} type configuration
 *  - {@link getPage} - paging and querying capabilities
 *
 * <strong>Assumes only reads/writes to {@link INFO_PATH} with JSON parsing to object</strong>
 * Otherwise the methods need to be overwritten by child classes.
 *
 * #### _Manager INDEPENDENT DataBase Access API_
 *
 * Methods:
 *  - {@link insertRecord}
 *  - {@link getRecord}
 *  - {@link deleteRecord}
 *  - {@link updateRecord}
 *  - {@link query} - with querying capabilities via {@link DEFAULT_QUERY_OPTIONS} type configuration
 *
 * @param {BaseManager} baseManager the base manager to have access to the identity api
 * @param {string} tableName the default table name for this manager eg: MessageManager will write to the messages table
 * @param {string[]} [indexes] a list of indexes to add to the table in the db upon initialization. requires a callback!
 * @param {function(err, Manager)} [callback] optional callback for when the assurance that the table has already been indexed is required.
 * Not used in this class. Child classes must implement if this functionality is required like:
 * <pre>
 *              if (this.indexes && callback){
 *                  super._indexTable(...this.indexes, (err) => {
 *                      if (err)
 *                          return self._err(`Could not update Indexes`, err, callback);
 *                      console.log(`Indexes for table ${self.tableName} updated`);
 *                      callback(undefined, self);
 *                  });
 *              }
 * </pre>
 * @module managers
 * @class Manager
 * @abstract
 */
class Manager{
    constructor(baseManager, tableName, indexes, callback){
        let self = this;
        this.storage = baseManager.db;
        this.getStorage = () => {
            if (!self.storage)
                self.storage = baseManager.db;
            if (!self.storage)
                throw new Error(`DB is not initialized`);
            return self.storage;
        }
        this.tableName = tableName;
        this.indexes = indexes;
        this.getIdentity = baseManager.getIdentity.bind(baseManager);
        this._getResolver = baseManager._getResolver;
        this._getKeySSISpace = baseManager._getKeySSISpace;
        this._loadDSU = baseManager._loadDSU;
        this._err = baseManager._err;
        this._sendMessage = function(did, api, message, callback){
            if (!callback){
                callback = message;
                message = api;
                api = this.tableName;
            }
            return baseManager.sendMessage(did, api, message, callback);
        }
        this._registerMessageListener = function(listener){
            return baseManager.registerMessageListener(this.tableName, listener);
        }
        this._deleteMessage = function(message, callback){
            return baseManager.deleteMessage(message, callback);
        }
        this._getMessages = function(callback){
            return baseManager.getMessages(this.tableName, callback);
        }
        if (this.indexes && callback){
            this._indexTable(...this.indexes, (err) => {
                if (err)
                    return self._err(`Could not update Indexes`, err, callback);
                console.log(`Indexes for table ${self.tableName} updated`);
                callback(undefined, self);
            });
        }
    }

    /**
     * Should be called by child classes if then need to index the table.
     * (Can't be called during the constructor of the Manager class due to the need of virtual method
     * @param {string|function} props the last argument must be the callback. The properties passed
     * must match the ones provided in {@link Manager#_indexItem} for this to work properly.
     *
     * callback receives the newly created indexes as the second argument
     * @private
     */
    _indexTable(...props){
        if (!Array.isArray(props))
            throw new Error(`Invalid properties provided`);
        const callback = props.pop();
        props.push('__timestamp');
        const self = this;
        self.getStorage().getIndexedFields(self.tableName, (err, indexes) => {
            if (err)
                return self._err(`Could not retrieve indexes from table ${self.tableName}`, err, callback);
            const newIndexes = [];
            const indexIterator = function(propsClone, callback){
                const index = propsClone.shift();
                if (!index)
                    return callback(undefined, newIndexes);
                if (indexes.indexOf(index) !== -1)
                    return indexIterator(propsClone, callback);
                self.getStorage().addIndex(self.tableName, index, (err) => {
                    if (err)
                        return self._err(`Could not add index ${index} on table ${self.tableName}`, err, callback);
                    newIndexes.push(index);
                    indexIterator(propsClone, callback);
                });
            }

            indexIterator(props.slice(), (err, updatedIndexes) => err
                ? self._err(`Could not update indexes for table ${self.tableName}`, err, callback)
                : callback(undefined, updatedIndexes));
        });
    }

    /**
     * Send a message to the specified DID
     * @param {string|W3cDID} did
     * @param {string} [api] defaults to the tableName
     * @param {string} message
     * @param {function(err)} callback
     */
    sendMessage(did, api, message, callback){
        return this._sendMessage(did, api, message, callback);
    }

    /**
     * Send a message to the specified DID
     * @param {string|W3cDID} did
     * @param {string} [api] defaults to the tableName
     * @param {string} message
     * @param {function(err)} callback
     */
    _sendMessage(did, api, message, callback){}

    registerMessageListener(listener){
        return this._registerMessageListener(listener);
    }

    _registerMessageListener(listener){}


    /**
     * Proxy call to {@link MessageManager#deleteMessage()}.
     * 
     * jpsl: PS to Tiago - I don't agree with proxying calls
     * (without any explict reason). It would be better to get the messageManager
     * and call the method there directly.
     */
    deleteMessage(message, callback) {
        return this._deleteMessage(message, callback);
    }

    _deleteMessage(message, callback) {}

    /**
     * Proxy call to {@link MessageManager#getMessages()} using tableName as the api value.
     * 
     * jpsl: PS to Tiago - I don't agree with proxying calls
     * (without any explict reason). It would be better to get the messageManager
     * and call the method there directly.
     */
    getMessages(callback){
        return this._getMessages(callback);
    }

    _getMessages(callback){}

    /**
     * Stops the message service listener
     */
    shutdownMessenger(){
        this.messenger.shutdown();
    }

    /**
     * Lazy loads the db
     * Is created in the constructor
     */
    getStorage(){};

    /**
     * @param {object} object the business model object
     * @param model the Controller's model object
     * @returns {{}}
     */
    toModel(object, model){
        model = model || {};
        for (let prop in object) {
            prop = typeof prop === 'number' ? '' + prop : prop;
            if (object.hasOwnProperty(prop)) {
                if (!model[prop])
                    model[prop] = {};
                model[prop].value = object[prop];
            }
        }
        return model;
    }

    /**
     * Should translate the Controller Model into the Business Model
     * @param model the Controller's Model
     * @returns {object} the Business Model object ready to feed to the constructor
     */
    fromModel(model){
        let result = {};
        Object.keys(model).forEach(key => {
            if (model.hasOwnProperty(key) && model[key].value)
                result[key] = model[key].value;
        });
        return result
    }

    /**
     * will be binded as the one from participant manager on initialization
     * @param {function(err, identity)} callback
     */
    getIdentity(callback){};

    /**
     * will be binded as the one from participant manager on initialization
     */
    _getResolver(){};

    /**
     * will be binded as the one from participant manager on initialization
     */
    _getKeySSISpace(){};

    /**
     * will be binded as the one from participant manager on initialization
     * @param {string|KeySSI} keySSI
     */
    _loadDSU(keySSI){};
    /**
     * Wrapper around OpenDSU's error wrapper
     * @param {string} message
     * @param {err} err
     * @param {function(err, ..*)} callback
     * @protected
     * @see _err
     */
    _err(message, err, callback){};

    /**
     * @return {string} the tableName passed in the constructor
     * @throws {Error} if the manager has no tableName
     * @protected
     */
    _getTableName(){
        if (!this.tableName)
            throw new Error('No table name specified');
        return this.tableName;
    }

    /**
     * Util function that loads a dsu and reads and JSON parses from the dsu's {@link INFO_PATH}
     * @param {string|KeySSI} keySSI
     * @param {function(err, object, Archive)} callback. object is the /info parsed as JSON.
     * @protected
     */
    _getDSUInfo(keySSI, callback){
        let self = this;
        self._loadDSU(keySSI, (err, dsu) => {
            if (err)
                return self._err(`Could not load record DSU: ${keySSI}`, err, callback);
            dsu.readFile(INFO_PATH, (err, data) => {
                if (err)
                    return self._err(`Could not read file at ${INFO_PATH}`, err, callback);
                try{
                    data = JSON.parse(data);
                } catch (e) {
                    return self._err(`Could not parse dsu data ${data.toString()}`, err, callback);
                }
                callback(undefined, data, dsu);
            });
        });
    }

    /**
     * Util iterator function
     * @param {string[]} records
     * @param {function(string, function(err, result))} getter
     * @param {result[]} [accumulator] defaults to []
     * @param {function(err, result[])} callback
     * @protected
     */
    _iterator(records, getter, accumulator, callback){
        if (!callback) {
            callback = accumulator;
            accumulator = [];
        }
        let self = this;
        const record = records.shift();
        if (!record) {
            console.log(`Found ${accumulator.length} items from records ${records}`);
            return callback(undefined, accumulator);
        }
        getter(record, (err, product) => {
            if (err)
                return self._err(`Could not get product`, err, callback);
            accumulator.push(product);
            return self._iterator(records, getter, accumulator, callback);
        });
    }

    /**
     * Creates a new item
     *
     * Child classes should override this so they can be called without the key param in Web Components
     * (and also to actually create the DSUs)
     *
     * @param {string} [key] key is optional so child classes can override them
     * @param {object} item
     * @param {function(err, object, Archive)} callback
     */
    create(key, item, callback) {
        throw new Error (`Child classes must implement this`);
    }

    /**
     * Must wrap the entry in an object like:
     * <pre>
     *     {
     *         index1: ...
     *         index2: ...
     *         value: item
     *     }
     * </pre>
     * so the DB can be queried by each of the indexes and still allow for lazy loading
     * @param {string} key
     * @param {object|string} [item]
     * @param {string|object} record
     * @return {object} the indexed object to be stored in the db
     * @protected
     */
    _indexItem(key, item, record){
        if (!record){
            record = item;
            item = undefined
        }
        return {
            key: key,
            value: record
        }
    };

    /**
     * reads ssi for that gtin in the db. loads is and reads the info at '/info'
     * @param {string} key
     * @param {boolean} [readDSU] defaults to true. decides if the manager loads and reads from the dsu or not
     * @param {function(err, object|KeySSI, Archive)} callback returns the Product if readDSU and the dsu, the keySSI otherwise
     */
    getOne(key, readDSU,  callback) {
        if (!callback){
            callback = readDSU;
            readDSU = true;
        }
        let self = this;
        self.getRecord(key, (err, itemSSI) => {
            if (err)
                return self._err(`Could not load record with key ${key} on table ${self._getTableName()}`, err, callback);
            if (!readDSU)
                return callback(undefined, itemSSI);
            self._getDSUInfo(itemSSI.value || itemSSI, callback);
        });
    }

    /**
     * Removes a product from the list (does not delete/invalidate DSU, simply 'forgets' the reference)
     * @param {string|number} key
     * @param {function(err)} callback
     */
    remove(key, callback) {
        let self = this;
        self.deleteRecord(key, callback);
    }

    /**
     * updates an item
     *
     * @param {string} [key] key is optional so child classes can override them
     * @param {object} newItem
     * @param {function(err, object, Archive)} callback
     */
    update(key, newItem, callback){
        if (!callback)
            return callback(`No key Provided...`);

        let self = this;
        self.getRecord(key, (err, record) => {
            if (err)
                return self._err(`Unable to retrieve record with key ${key} from table ${self._getTableName()}`, err, callback);
            self._getDSUInfo(record, (err, item, dsu) => {
                if (err)
                    return self._err(`Key: ${key}: unable to read From DSU from SSI ${record}`, err, callback);
                dsu.writeFile(INFO_PATH, JSON.stringify(newItem), (err) => {
                    if (err)
                        return self._err(`Could not update item ${key} with ${JSON.stringify(newItem)}`, err, callback);
                    console.log(`Item ${key} in table ${self._getTableName()} updated`);
                    callback(undefined, newItem, dsu)
                });
            });
        });
    }

    /**
     * Lists all registered items according to query options provided
     * @param {boolean} [readDSU] defaults to true. decides if the manager loads and reads from the dsu's {@link INFO_PATH} or not
     * @param {object} [options] query options. defaults to {@link DEFAULT_QUERY_OPTIONS}
     * @param {function(err, object[])} callback
     */
    getAll(readDSU, options, callback) {
        if (!callback){
            if (!options){
                callback = readDSU;
                options = DEFAULT_QUERY_OPTIONS;
                readDSU = true;
            }
            if (typeof readDSU === 'boolean'){
                callback = options;
                options = DEFAULT_QUERY_OPTIONS;
            }
            if (typeof readDSU === 'object'){
                callback = options;
                options = readDSU;
                readDSU = true;
            }
        }

        options = options || DEFAULT_QUERY_OPTIONS;

        let self = this;
        self.query(options.query, options.sort, options.limit, (err, records) => {
            if (err)
                return self._err(`Could not perform query`, err, callback);
            records = records.map(r => r.value);
            if (!readDSU)
                return callback(undefined, records);
            self._iterator(records.slice(), self._getDSUInfo.bind(self), (err, result) => {
                if (err)
                    return self._err(`Could not parse ${self._getTableName()}s ${JSON.stringify(records)}`, err, callback);
                console.log(`Parsed ${result.length} ${self._getTableName()}s`);
                callback(undefined, result);
            });
        });
    }

    /**
     * Converts the text typed in a general text box into the query for the db
     * Subclasses should override this
     * @param {string} keyword
     * @return {string[]} query
     * @protected
     */
    _keywordToQuery(keyword){
        keyword = keyword || '.*';
        return [`key like /${keyword}/g`];
    }

    /**
     * Returns a page object
     * @param {number} itemsPerPage
     * @param {number} page
     * @param {string} keyword
     * @param {string} sort
     * @param {boolean} readDSU
     * @param {function(err, Page)}callback
     */
    getPage(itemsPerPage, page, keyword, sort, readDSU, callback){
        const self = this;
        page = page || 1;

        const options = {
            query: keyword ? self._keywordToQuery(keyword) : ['__timestamp > 0'],
            sort: sort || "dsc",
            limit: undefined
        }

        const toPage = function(currentPage, totalPages, items){
            return new Page({
                itemsPerPage: itemsPerPage,
                currentPage: currentPage,
                totalPages: totalPages,
                items: items || []
            });
        }

        const paginate = function(items){
            const totalPages = Math.floor(items.length / itemsPerPage) + (items.length % itemsPerPage === 0 ? 0 : 1);
            let startIndex = (page - 1) * itemsPerPage;
            startIndex = startIndex === 0 ? startIndex : startIndex - 1;
            const endIndex = startIndex + itemsPerPage >= items.length ? undefined: startIndex + itemsPerPage;
            const sliced = items.slice(startIndex, endIndex);
            return toPage(page, totalPages, sliced);
        }

        self.getAll(readDSU, options, (err, records) => {
           if (err)
               return self._err(`Could not retrieve records to page`, err, callback);
            if (records.length === 0)
                return callback(undefined, toPage(0, 0, records));
           if (records.length <= itemsPerPage)
               return callback(undefined, toPage(1, 1, records));
           const page = paginate(records);
           callback(undefined, page);
        });
    }

    /**
     * Wrapper around the storage's insertRecord where the tableName defaults to the manager's
     * @param {string} [tableName] defaults to the manager's table name
     * @param {string} key
     * @param {object} record
     * @param {function(err)} callback
     */
    insertRecord(tableName, key, record, callback){
        if (!callback){
            callback = record;
            record = key;
            key = tableName;
            tableName = this._getTableName();
        }
        const self = this;
        console.log("insertRecord tableName="+tableName, "key", key, "record", record);
        this.getStorage().insertRecord(tableName, key, record, (err) => {
            if (err)
                return self._err(`Could not insert record with key ${key} in table ${tableName}`, err, callback);
            if (!self.indexes)
                return callback(undefined);
            self._indexTable(...self.indexes, (err, updated) => {
                if (err)
                    return self._err(`Could not update table ${tableName}'s indexes`, err, callback);
                if (updated)
                    updated.forEach(index => console.log(`Index ${index} created on table ${tableName}`));
                callback(undefined);
            });
        });
    }

    /**
     * Wrapper around the storage's updateRecord where the tableName defaults to the manager's
     * @param {string} [tableName] defaults to the manager's table name
     * @param {string} key
     * @param {*|string} newRecord
     * @param {function(err)} callback
     */
    updateRecord(tableName, key, newRecord, callback){
        if (!callback){
            callback = newRecord;
            newRecord = key;
            key = tableName;
            tableName = this._getTableName();
        }
        this.getStorage().updateRecord(tableName, key, newRecord, callback);
    }

    /**
     * Wrapper around the storage's getRecord where the tableName defaults to the manager's
     * @param {string} [tableName] defaults to the manager's table name
     * @param {string} key
     * @param {function(err)} callback
     */
    getRecord(tableName, key, callback){
        if (!callback){
            callback = key;
            key = tableName;
            tableName = this._getTableName();
        }
        this.getStorage().getRecord(tableName, key, callback);
    }

    /**
     * Wrapper around the storage's deleteRecord where the tableName defaults to the manager's
     * @param {string} [tableName] defaults to the manager's table name
     * @param {string} key
     * @param {function(err, record)} callback
     */
    deleteRecord(tableName, key, callback) {
        if (!callback) {
            callback = key;
            key = tableName;
            tableName = this._getTableName();
        }
        this.getStorage().deleteRecord(tableName, key, (err, oldRecord) => {
            console.log("Deleted key", key, "old record", err, oldRecord);
            callback(err, oldRecord);
        });
    }

    /**
     * Wrapper around the storage's query where the tableName defaults to the manager's
     * @param {string} [tableName] defaults to the manager's table name
     * @param {function(record)} query
     * @param {string} sort
     * @param {number} limit
     * @param {function(err, record[])} callback
     */
    query(tableName, query, sort, limit, callback) {
        if (!callback){
            callback = limit;
            limit = sort;
            sort = query;
            query = tableName;
            tableName = this._getTableName();
        }
        console.log("query tableName="+tableName+" query=\""+query+"\" sort="+sort+" limit="+limit);
        this.getStorage().query(tableName, query, sort, limit, callback);
    }
}

module.exports = Manager;
},{"../constants":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/constants.js"}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/managers/MessageManager.js":[function(require,module,exports){
const Manager = require('./Manager')
const { _err } = require('../services/utils')
const { MESSAGE_REFRESH_RATE, DID_METHOD, MESSAGE_TABLE } = require('../constants');

/**
 * @typedef W3cDID
 */

/**
 * Class to wrap messages
 */
class Message{
    /**
     *
     * @param {string} api
     * @param {*} message anything as long as it is serializable i guess
     */
    constructor(api, message){
        this.api = api;
        this.message = message;
    }
}
/**
 * Manager Classes in this context should do the bridge between the controllers
 * and the services exposing only the necessary api to the controllers while encapsulating <strong>all</strong> business logic.
 *
 * All Manager Classes should be singletons.
 *
 * This complete separation of concerns is very beneficial for 2 reasons:
 * <ul>
 *     <li>Allows for testing since there's no browser dependent code (i think) since the DSUStorage can be 'mocked'</li>
 *     <li>Allows for different controllers access different business logic when necessary (while benefiting from the singleton behaviour)</li>
 * </ul>
 *
 * @param {Database} storage the DSU where the storage should happen or more commonly the Database Object
 * @param {BaseManager} baseManager the base manager to have access to the identity api
 * @param {string} didString
 * @param {function(err, Manager)} [callback] optional callback for when the assurance that the table has already been indexed is required.
 * @module managers
 * @class MessageManager
 */
class MessageManager extends Manager{
    constructor(baseManager, didString, callback){
        super(baseManager, MESSAGE_TABLE, ['api'], callback);
        this.w3cDID = require('opendsu').loadApi('w3cdid');
        this.didString = didString;
        this.did = undefined;
        let self = this;
        this._listeners = {};
        this.timer = undefined;
        this.getOwnDID((err, didDoc) => err
            ? createOpenDSUErrorWrapper(`Could not get Own DID`, err)
            : self._startMessageListener(didDoc));
    }

    shutdown(){
        if (!this.timer)
            return console.log(`The message service for ${this.didString} is not running`);
        clearInterval(this.timer);
        console.log(`The messenger for ${this.didString} stopped`);
    }

    _receiveMessage(message, callback){
        const {api} = message;
        let self = this;
        self._saveToInbox(message, (err) => {
            if (err)
                return _err(`Could not save message to inbox`, err, callback);
            console.log(`Message ${JSON.stringify(message)} saved to table ${self._getTableName()} on DID ${self.didString}`);
            if (api in self._listeners) {
                console.log(`Found ${self._listeners[api].length} listeners for the ${api} message api`)
                self._listeners[api].forEach(apiListener => {
                    apiListener(message);
                });
            }
        });
    }

    _saveToInbox(message, callback){
        const key = Date.now() + '';
        message.key = key; // jpsl: add a key to the message, so that it can be deleted later based on the record object
        this.insertRecord(key, message, callback);
    }

    /**
     *
     * @param {string} api - should match one the DB constants with the tableName.
     * @param {function(Message)} onNewApiMsgListener where Message is an object obtained by JSON.parse(message)
     */
    registerListeners(api, onNewApiMsgListener){
        if (!(api in this._listeners))
            this._listeners[api] = [];
        this._listeners[api].push(onNewApiMsgListener);
    }

    /**
     * Sends a Message to the provided did
     * @param {string|W3cDID} did
     * @param {Message} message
     * @param {function(err)}callback
     */
    sendMessage(did, message, callback){
        if (typeof did !== 'object')
            return this._getDID(did + '', (err, didDoc) => err
                ? _err(`Could not get DID Document for string ${did}`, err, callback)
                : this.sendMessage(didDoc, message, callback));

        if (!(message instanceof Message))
            return callback(`Message ${message} must be instance of class Message`);

        this.getOwnDID((err, selfDID) => {
            console.log("Sending message", message, "to did", did.getIdentifier());
            selfDID.sendMessage(JSON.stringify(message), did.getIdentifier(), err => err
                ? _err(`Could not send Message`, err, callback)
                : callback());
        });
    }

    /**
     * Delete a message from the MESSAGE_TABLE.
     * @param {string} [tableName] defaults to MESSAGE_TABLE
     * @param {object} message. Must have a key property.
     * @param {function(err)} callback 
     * @returns 
     */
    deleteMessage(tableName, message, callback) {
        if (!callback){
            callback = message;
            message = tableName;
            tableName = MESSAGE_TABLE;
        }
        if (!message)
            return callback("Message undefined");
        if (!message.key)
            return callback(`Message ${message} key property undefined`);
        this.deleteRecord(tableName, message.key, (err, oldRecord) => {
            return callback(err);
        });
    }

    getMessages(api, callback){
        if (!callback){
            callback = api;
            api = undefined;
        }
        if (api) {
            // filter messages for this api only
            this.query(MESSAGE_TABLE, `api == ${api}`, undefined, 10, callback);
        } else {
            // list all messages
            this.query(MESSAGE_TABLE, "__timestamp > 0", undefined, 10, callback);
        }
    }

    _startMessageListener(did){
        let self = this;
        console.log("_startMessageListener", did.getIdentifier());
        did.readMessage((err, message) => {
            if (err)
                return console.log(createOpenDSUErrorWrapper(`Could not read message`, err));
            console.log("did.readMessage did", did.getIdentifier(), "message", message);
            // jpsl: did.readMessage appears to return a string, but db.insertRecord requires a record object.
            // ... So JSON.parse the message into an object.
            // https://opendsu.slack.com/archives/C01DQ33HYQJ/p1618848231120300
            if (typeof message == "string") {
                try {
                    message = JSON.parse(message);
                } catch (error) {
                    console.log(createOpenDSUErrorWrapper(`Could not JSON.parse message ${message}`, err));
                    self._startMessageListener(did);
                    return;
                }
            }
            self._startMessageListener(did);
            self._receiveMessage(message, (err, message) => {
                if (err)
                    return console.log(createOpenDSUErrorWrapper(`Failed to receive message`, err));
                console.log(`Message received ${message}`);
            });
        });
    }

    getOwnDID(callback){
        if (this.did)
            return callback(undefined, this.did);
        this._getDID(this.didString, callback);
    }

    _getDID(didString, callback){
        this.w3cDID.createIdentity(DID_METHOD, didString, (err, didDoc) => err
            ? _err(`Could not create DID identity`, err, callback)
            : callback(undefined, didDoc));
    }
}

let messageManager;

/**
 * @param {BaseManager} baseManager  only required the first time, if not forced
 * @param {string} didString
 * @param {boolean} [force] defaults to false. overrides the singleton behaviour and forces a new instance.
 * Makes DSU Storage required again!
 * @param {function(err, Manager)} [callback] optional callback for when the assurance that the table has already been indexed is required.
 * @returns {MessageManager}
 * @module managers
 */
const getMessageManager = function(baseManager, didString, force, callback) {
    if (typeof force === 'function'){
        callback = force;
        force = false;
    }
    if (!messageManager || force) {
        if (!baseManager || !didString)
            throw new Error("Missing Objects for instantiation");
        messageManager = new MessageManager(baseManager, didString, callback);
    }
    return messageManager;
}

module.exports = {
    getMessageManager,
    Message
};
},{"../constants":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/constants.js","../services/utils":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/utils.js","./Manager":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/managers/Manager.js","opendsu":false}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/model/Utils.js":[function(require,module,exports){
/**
 * @module utils
 */

/**
 * Generates a string of the provided length filled with random characters from the provided characterSet
 * Clone of PrivateSky Code
 */
function generate(charactersSet, length){
    let result = '';
    const charactersLength = charactersSet.length;
    for (let i = 0; i < length; i++) {
        result += charactersSet.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {
    /**
     * Generates a string of the provided length filled with random characters from 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
     * Clone of PrivateSky Code
     */
    generateID(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return generate(characters, length);
    },

    /**
     * Generates a string of the provided length filled with random numeric characters
     * Clone of PrivateSky Code
     */
    generateNumericID(length) {
        const characters = '0123456789';
        return generate(characters, length);
    },

    /**
     * Clone of PrivateSky Code
     */
    generateSerialNumber(length){
        let char = generate("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 2);
        let number = this.generateNumericID(length-char.length);
        return char+number;
    }
}
},{}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/model/Validations.js":[function(require,module,exports){
/**
 * @module validations
 * @memberOf toolkit.model.validations
 */

/**
 * Supported ion-input element types
 */
const ION_TYPES = {
    EMAIL: "email",
    NUMBER: "number",
    TEXT: "text",
    DATE: "date"
}

/**
 * Supported ion-input element sub-types (under the {@link ION_CONST.name_key})
 */
const SUB_TYPES = {
    TIN: "tin"
}

/**
 *
 */
const QUERY_ROOTS = {
    controller: "controller",
    parent: "parent",
    self: "self"
}
/**
 * Html attribute name constants
 *
 * mostly straightforward with the notable exceptions:
 *  - {@link ION_CONST.error.append} variable append strategy - que root of the css query
 *  - {@link ION_CONST.error.queries}:
 *    - {@link ION_CONST.error.queries.query} the media query that while be made via {@link HTMLElement#querySelectorAll}
 *    - {@link ION_CONST.error.queries.variables} variables that will be set/unset:
 *       the keys will be concatenated with '--' eg: key => element.style.setProperty('--' + key, variables[key].set)
 *
 *       The placeholder ${name} can be used to mark the field's name
 */
const ION_CONST = {
    name_key: "name",
    type_key: "type",
    required_key: "required",
    max_length: "maxlength",
    min_length: "minlength",
    max_value: "max",
    min_value: "min",
    input_tag: "ion-input",
    error: {
        queries: [
            {
                query: "ion-input",
                root: "parent",
                variables: [
                    {
                        variable: "--color",
                        set: "var(--ion-color-danger)",
                        unset: "var(--ion-color)"
                    }
                ]
            },
            {
                query: "",
                root: "parent",
                variables: [
                    {
                        variable: "--border-color",
                        set: "var(--ion-color-danger)",
                        unset: ""
                    }
                ]
            }
        ]
    }
}

/**
 * Maps prop names to their custom validation
 * @param {string} prop
 * @param {*} value
 * @returns {string|undefined} undefined if ok, the error otherwise
 */
const propToError = function(prop, value){
    switch (prop){
        case SUB_TYPES.TIN:
            return tinHasErrors(value);
        default:
            break;
    }
}

/**
 * Validates a pattern
 * @param {string} text
 * @param {pattern} pattern in the '//' notation
 * @returns {string|undefined} undefined if ok, the error otherwise
 */
const patternHasErrors = function(text, pattern){
    if (!text) return;
    if (!pattern.test(text))
        return "Field does not match pattern";
}

/**
 * @param {string} email
 * @returns {string|undefined} undefined if ok, the error otherwise
 */
const emailHasErrors = function(email){
    if (patternHasErrors(email, /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/))
        return "Invalid email";
}

/**
 * Validates a tin number
 * @param {string|number} tin
 * @returns {string|undefined} undefined if ok, the error otherwise
 */
const tinHasErrors = function(tin){
    if (!tin) return;
    tin = tin + '';
    if (patternHasErrors(tin,/^\d{9}$/))
        return "Not a valid Tin";
}

/**
 * Validates a number Field (only integers supported)
 * @param {number} value
 * @param props
 */
const numberHasErrors = function(value, props){
    if (props[ION_CONST.name_key] === SUB_TYPES.TIN)
        return tinHasErrors(value);
    let {max, min} = props;
    if (value > max)
        return `The maximum is ${max}`;
    if (value < min)
        return `The minimum is ${min}`;
}

/**
 * Validates a date value
 * @param {Date} date
 * @param props
 */
const dateHasErrors = function(date, props){
    throw new Error("Not implemented date validation");
}

/**
 * Validates a text value
 * @param {string} text
 * @param props
 */
const textHasErrors = function(text, props){
    if (props[ION_CONST.name_key] === SUB_TYPES.TIN)
        return tinHasErrors(text);
}

/**
 * parses the numeric values
 * @param props
 */
const parseNumeric = function(props){
    let prop;
    try{
        for (prop in props)
            if (props.hasOwnProperty(prop) && props[prop])
                if ([ION_CONST.max_length, ION_CONST.max_value, ION_CONST.min_length, ION_CONST.min_value].indexOf(prop) !== -1)
                    props[prop] = parseInt(props[prop]);
    } catch (e){
        throw new Error(`Could not parse numeric validations attributes for field ${props.name} prop: ${prop}`);
    }
    return props;
}

/**
 * Parses the supported attributes in the element
 * @param {HTMLElement} element
 * @return the object of existing supported attributes
 */
const getValidationAttributes = function(element){
    return {
        type: element[ION_CONST.type_key],
        name: element[ION_CONST.name_key],
        required: element[ION_CONST.required_key],
        max: element[ION_CONST.max_value],
        maxlength: element[ION_CONST.max_length],
        min: element[ION_CONST.min_value],
        minlength: element[ION_CONST.min_length]
    };
}

/**
 * Validates a ion-input element for required & max/min length.
 * @param {HTMLElement} element
 * @param {object} props
 * @returns {string|undefined} undefined if ok, the error otherwise
 */
const hasRequiredAndLengthErrors = function(element, props){
    let {required, maxLength, minLength} = props;
    let value = element.value;
    value = value && typeof value === 'string' ? value.trim() : value;
    if (required && !value)
        return "Field is required";
    if (!value) return;
    if (minLength && value.length < minLength)
        return `The minimum length is ${minLength}`;
    if (maxLength && value.length > maxLength)
        return `The maximum length is ${minLength}`;
}

/**
 *
 * @param props
 * @param prefix
 * @return {boolean}
 */
const testInputEligibility = function(props, prefix){
    return !(!props[ION_CONST.name_key] || !props[ION_CONST.type_key] || props[ION_CONST.name_key].indexOf(prefix) === -1);
}

/**
 * Test a specific type of Ionic input field for errors
 *
 * should (+/-) match the ion-input type property
 *
 * supported types:
 *  - email;
 *  - tin
 *  - text
 *  - number
 *
 * @param {HTMLElement} element the ion-input field
 * @param {string} prefix the prefix for the ion-input to be validated
 */
const hasIonErrors = function(element, prefix){
    let props = getValidationAttributes(element);
    if (!testInputEligibility(props, prefix))
        throw new Error(`input field ${element} with props ${props} does not meet criteria for validation`);
    props[ION_CONST.name_key] = props[ION_CONST.name_key].substring(prefix.length);
    let errors = hasRequiredAndLengthErrors(element, props);
    if (errors)
        return errors;

    let value = element.value;
    switch (props[ION_CONST.type_key]){
        case ION_TYPES.EMAIL:
            errors = emailHasErrors(value);
            break;
        case ION_TYPES.DATE:
            errors = dateHasErrors(value, props);
            break;
        case ION_TYPES.NUMBER:
            props = parseNumeric(props);
            errors = numberHasErrors(value, props);
            break;
        case ION_TYPES.TEXT:
            errors = textHasErrors(value, props);
            break;
        default:
            errors = undefined;
    }

    return errors;
}

/**
 * Until I get 2way data binding to work on ionic components, this solves it.
 *
 * It validates the fields via their ion-input supported properties for easy integration if they ever work natively
 *
 * If the input's value has changed, an event called 'input-has-changed' with the input name as data
 *
 * @param {WebcController} controller
 * @param {HTMLElement} element the ion-input element
 * @param {string} prefix prefix to the name of the input elements
 * @param {boolean} [force] defaults to false. if true ignores if the value changed or not
 * @returns {string|undefined} undefined if ok, the error otherwise
 */
const updateModelAndGetErrors = function(controller, element, prefix, force){
    force = !!force || false;
    if (!controller.model)
        return;
    let name = element.name.substring(prefix.length);
    if (typeof controller.model[name] === 'object') {
        let valueChanged = (controller.model[name].value === undefined && !!element.value)
            || (!!controller.model[name].value && controller.model[name].value !== element.value);

        controller.model[name].value = element.value;
        if (valueChanged || force){
            const hasErrors = hasIonErrors(element, prefix);
            controller.model[name].error = hasErrors;
            updateStyleVariables(controller, element, hasErrors);
            controller.send('input-has-changed', name);
            return hasErrors;
        }
        return controller.model[name].error;
    }
}

/**
 * Manages the inclusion/exclusion of the error variables according to {@link ION_CONST#error#variables} in the element according to the selected {@link ION_CONST#error#append}
 * @param {WebcController} controller
 * @param {HTMLElement} element
 * @param {string} hasErrors
 */
const updateStyleVariables = function(controller, element, hasErrors){
    let el, selected, q;
    const getRoot = function(root) {
        let elem;
        switch (root) {
            case QUERY_ROOTS.parent:
                elem = element.parentElement;
                break;
            case QUERY_ROOTS.self:
                elem = element;
                break;
            case QUERY_ROOTS.controller:
                elem = controller.element;
                break;
            default:
                throw new Error("Unsupported Error style strategy");
        }
        return elem;
    }
    const queries = ION_CONST.error.queries;

    queries.forEach(query => {
        q = query.query.replace('${name}', element.name);
        el = getRoot(query.root);
        selected = q ? el.querySelectorAll(q) : [el];
        selected.forEach(s => {
            query.variables.forEach(v => {
                s.style.setProperty(v.variable, hasErrors ? v.set : v.unset)
            });
        });
    });
}

/**
 * iterates through all supported inputs and calls {@link updateModelAndGetErrors} on each.
 *
 * sends controller validation event
 * @param {WebcController} controller
 * @param {string} prefix
 * @return {boolean} if there are any errors in the model
 * @param {boolean} force (Decides if forces the validation to happen even if fields havent changed)
 */
const controllerHasErrors = function(controller, prefix, force){
    let inputs = controller.element.querySelectorAll(`${ION_CONST.input_tag}[name^="${prefix}"]`);
    let errors = [];
    let error;
    inputs.forEach(el => {
        error = updateModelAndGetErrors(controller, el, prefix, force);
        if (error)
            errors.push(error);
    });
    let hasErrors = errors.length > 0;
    controller.send(hasErrors ? 'ion-model-is-invalid' : 'ion-model-is-valid');
    return hasErrors;
}

/**
 * When using ionic input components, this binds the controller for validation purposes.
 *
 * Inputs to be eligible for validation need to be named '${prefix}${propName}' where the propName must
 * match the type param in {@link hasErrors} via {@link updateModelAndGetErrors}
 *
 * Gives access to the validateIonic method on the controller via:
 * <pre>
 *     controller.hasErrors();
 * </pre>
 * (returns true or false)
 *
 * where all the inputs are validated
 *
 * @param {WebcController} controller
 * @param {function()} [onValidModel] the function to be called when the whole Controller model is valid
 * @param {function()} [onInvalidModel] the function to be called when any part of the model is invalid
 * @param {string} [prefix] the prefix for the ion-input to be validated. defaults to 'input-'
 */
const bindIonicValidation = function(controller, onValidModel, onInvalidModel, prefix){
    if (typeof onInvalidModel === 'string' || !onInvalidModel){
        prefix = onInvalidModel
        onInvalidModel = () => {
            const submitButton = controller.element.querySelector('ion-button[type="submit"]');
            if (submitButton)
                submitButton.disabled = true;
        }
    }
    if (typeof onValidModel === 'string' || !onValidModel){
        prefix = onValidModel
        onValidModel = () => {
            const submitButton = controller.element.querySelector('ion-button[type="submit"]');
            if (submitButton)
                submitButton.disabled = false;
        }
    }

    prefix = prefix || 'input-';
    controller.on('ionChange', (evt) => {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        let element = evt.target;
        if (!element.name) return;
        let errors = updateModelAndGetErrors(controller, element, prefix);
        if (errors)     // one fails, all fail
            controller.send('ion-model-is-invalid');
        else            // Now we have to check all of them
            controllerHasErrors(controller, prefix);
    });

    controller.hasErrors = (force) => controllerHasErrors(controller, prefix, force);

    controller.on('ion-model-is-valid', (evt) => {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        if (onValidModel)
            onValidModel.apply(controller);
    });

    controller.on('ion-model-is-invalid', (evt) => {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        if (onInvalidModel)
            onInvalidModel.apply(controller);
    });

    controller.on('input-has-changed', _handleErrorElement.bind(controller));
}

const _handleErrorElement = function(evt){
    let name = evt.detail;
    let attributes = this.model.toObject()[name];
    let errorEl = this.element.querySelector(`ion-note[name="note-${name}"]`);
    if (attributes.error){
        if (errorEl){
            errorEl.innerHTML = attributes.error;
        } else {
            errorEl = document.createElement('ion-note');
            errorEl.setAttribute('position', 'stacked');
            errorEl.setAttribute('slot', 'end');
            errorEl.setAttribute('color', 'danger');
            errorEl.setAttribute('name', `note-${name}`)
            errorEl.innerHTML = attributes.error;
            let htmlEl = this.element.querySelector(`ion-item ion-input[name="input-${name}"]`);
            htmlEl.insertAdjacentElement('afterend', errorEl);
        }
    } else if (errorEl) {
        errorEl.remove();
    }
}

/**
 * Validates a Model element according to prop names
 * *Does not validate 'required' or more complex attributes yet*
 * TODO use annotations to accomplish that
 * @returns {string|undefined} undefined if ok, the error otherwise
 */
const modelHasErrors = function(model){
    let error;
    for (let prop in model)
        if (model.hasOwnProperty(prop)){
            if (prop in Object.values(ION_TYPES) || prop in Object.values(SUB_TYPES))
                error = propToError(prop, model[prop]);
            if (error)
                return error;
        }
}

/**
 * Provides the implementation for the Model to be validatable alongside Ionic components
 * via the {@link hasErrors} method
 * @interface
 */
class Validatable{
    /**
     * @see {modelHasErrors}
     */
    hasErrors(){
        return modelHasErrors(this);
    }
}

module.exports = {
    Validatable,
    bindIonicValidation,
    emailHasErrors,
    tinHasErrors,
    textHasErrors,
    numberHasErrors
};
},{}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/DSUService.js":[function(require,module,exports){
/**
 * @module services
 */

/**
 *
 */
const utils = require("./utils.js");

const doPost = utils.getPostHandlerFor("dsu-wizard");

if (utils.getEnv() === 'nodejs')
    FormData = require('form-data');    // needed because nodejs does not have FormData. his makes sure we can use it in tests

/**
 * Class responsible for Authenticated DSU transactions between the client and the API Hub
 * @class DSUService
 */
class DSUService {
    constructor() {
        let openDSU = require('opendsu');
        let crypto = openDSU.loadApi("crypto");
        let http = openDSU.loadApi("http");
        this.keyssiSpace = openDSU.loadApi('keyssi');

        // http.registerInterceptor((data, callback)=>{
        //     let {url, headers} = data;
        //     let scope = "";
        //
        //     if(typeof this.holderInfo != "undefined"){
        //         crypto.createPresentationToken(this.holderInfo.ssi, scope, this.credential, (err, presentationToken)=>{
        //             if(err){
        //                 return callback(err);
        //             }
        //
        //             headers["Authorization"] = presentationToken;
        //             return callback(undefined, {url, headers});
        //         });
        //     }else {
        //         console.log("Unexpected case");
        //         return callback(undefined, {url, headers});
        //     }
        //
        // });
    }

    // ensureHolderInfo(callback) {
    //     function getJSON(pth, callback){
    //         scriptUtils.fetch(pth).then((response) => {
    //             return response.json();
    //         }).then((json) => {
    //             return callback(undefined, json)
    //         }).catch(callback);
    //     }
    //
    //     if (typeof this.holderInfo === "undefined" || typeof this.credential === "undefined") {
    //         getJSON("/download/myKeys/holder.json", (err, holderInfo) => {
    //             if (err) {
    //                 return callback(Error("No holder info available!"));
    //             }
    //             this.holderInfo = holderInfo;
    //
    //             getJSON("/download/myKeys/credential.json", (err, result) => {
    //                 if (err) {
    //                     return callback(Error("No credentials available!"));
    //                 }
    //                 this.credential = result.credential;
    //                 return callback(undefined, holderInfo);
    //             });
    //         });
    //     } else {
    //         callback(undefined, this.holderInfo);
    //     }
    // }

    /**
     * This callback is displayed as part of the DSUService class.
     * @callback DSUService~callback
     * @param {string|object|undefined} error
     * @param {string|undefined} [keySSI]: not in human readable form
     */

    /**
     * This function is called by DSUService class to initialize/update DSU Structure.
     * @callback DSUService~modifier
     * @param {DSUBuilder} dsuBuilder
     * @param {DSUService~callback} callback
     */

    /**
     * Creates a DSU and initializes it via the provided initializer
     * @param {string} domain: the domain where the DSU is meant to be stored
     * @param {string|object} keySSIOrEndpoint: the keySSI string or endpoint object {endpoint: 'gtin', data: 'data'}
     * @param {DSUService~modifier} initializer: a method with arguments (dsuBuilder, callback)
     * <ul><li>the dsuBuilder provides the api to all operations on the DSU</li></ul>
     * @param {DSUService~callback} callback: the callback function
     */
    create(domain, keySSIOrEndpoint, initializer, callback){
        let self = this;
        let simpleKeySSI = typeof keySSIOrEndpoint === 'string';

        self.getTransactionId(domain, (err, transactionId) => {
            if (err)
                return callback(err);

            let afterKeyCb = function(err){
                if (err)
                    return callback(err);

                initializer(self.bindToTransaction(domain, transactionId), err => {
                    if (err)
                        return callback(err);
                    self.buildDossier(transactionId, domain, (err, keySSI) => {
                        if (err)
                            return callback(err);
                        callback(undefined, self.keyssiSpace.parse(keySSI));
                    });
                });
            };

            if (simpleKeySSI){
                self.setKeySSI(transactionId, domain, keySSIOrEndpoint, afterKeyCb);
            } else {
                self.setCustomSSI(transactionId, domain, keySSIOrEndpoint.endpoint, keySSIOrEndpoint.data, afterKeyCb);
            }
        });
    }

    /**
     * Creates a DSU and initializes it via the provided initializer
     * @param {string} domain: the domain where the DSU is meant to be stored
     * @param {keySSI} keySSI:
     * @param {DSUService~modifier} modifier: a method with arguments (dsuBuilder, callback)
     * <ul><li>the dsuBuilder provides the api to all operations on the DSU</li></ul>
     * @param {DSUService~callback} callback: the callback function
     */
    update(domain, keySSI, modifier, callback){
        let self = this;
        self.getTransactionId(domain, (err, transactionId) => {
           if (err)
               return callback(err);
           self.setKeySSI(transactionId, domain, keySSI, err =>{
               if (err)
                   return callback(err);
               modifier(self.bindToTransaction(domain, transactionId), (err, keySSI) => {
                    if (err)
                        return callback(err);
                    callback(undefined, keySSI);
               });
           });
        });
    }

    /**
     * Binds the DSU<service to the transaction and outputs a DSUBuilder
     * @param {string} domain
     * @param {string} transactionId
     * @returns {DSUBuilder} the dsu builder
     */
    bindToTransaction(domain, transactionId){
        let self = this;
        /**
         * Wrapper class around DSUService with binded transactionId and domain
         */
        return new class DSUBuilder {
            /**
             * @see {@link DSUService#addFileDataToDossier} with already filled transactionId and domain
             * @module services
             */
            addFileDataToDossier(fileName, fileData, callback){
                self.addFileDataToDossier(transactionId, domain, fileName, fileData, callback);
            };
            /**
             * @see {@link DSUService#mount} with already filled transactionId and domain
             * @module services
             */
            mount(path, seed, callback){
                self.mount(transactionId, domain, path, seed, callback);
            };
        }
    }

    getTransactionId(domain, callback) {

        let obtainTransaction = ()=>{
            doPost(`/${domain}/begin`, '',(err, transactionId) => {
                if (err)
                    return callback(err);

                return callback(undefined, transactionId);
            });
        }

        // this.ensureHolderInfo( (err)=>{
        //     if(err){
        //         return OpenDSUSafeCallback(callback)(createOpenDSUErrorWrapper("Holder missconfiguration in the wallet", err));
        //     }
            obtainTransaction();
        // });
    }

    setKeySSI(transactionId, domain, keyssi, callback) {
        const url = `/${domain}/setKeySSI/${transactionId}`;
        doPost(url, keyssi, callback);
    }

    setCustomSSI(transactionId, domain, endpoint, data, callback){
        const url = `/${domain}/${endpoint}/${transactionId}`;
        doPost(url, JSON.stringify(data), callback);
    }

    addFileDataToDossier(transactionId, domain, fileName, fileData, callback) {
        const url = `/${domain}/addFile/${transactionId}`;

        if (fileData instanceof ArrayBuffer) {
            fileData = new Blob([new Uint8Array(fileData)], {type: "application/octet-stream"});
        }
        let body = new FormData();
        let inputType = "file";
        body.append(inputType, fileData);

        doPost(url, body, {headers: {"x-dossier-path": fileName}}, callback);
    }

    mount(transactionId, domain, path, seed, callback) {
        const url = `/${domain}/mount/${transactionId}`;
        doPost(url, "", {
            headers: {
                'x-mount-path': path,
                'x-mounted-dossier-seed': seed
            }
        }, callback);
    }

    buildDossier(transactionId, domain, callback) {
        const url = `/${domain}/build/${transactionId}`;
        doPost(url, "", callback);
    }
}

module.exports = DSUService;

},{"./utils.js":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/utils.js","form-data":false,"opendsu":false}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/WebComponentService.js":[function(require,module,exports){
/**
 * @module services
 */

/**
 *
 */
const { INFO_PATH } = require('../constants');
const { _err } = require('./utils');
/**
 * This service is the bridge between custom webcomponents and PDM's openDSU SSApp Architecture
 */
function WebComponentService() {
    const { getResolver, getKeySSISpace } = require('./utils');

    /**
     * retrieves the object stored at {@link INFO_PATH} to the dsu with the provided keySSI
     * @param {string} keySSI
     * @param {function(err, object)} callback
     */
    this.getInfo = function(keySSI, callback){
        let key;
        try {
            key = getKeySSISpace().parse(keySSI);
        } catch (e){
            return _err(`Could not parse keySSI`, e, callback);
        }

        getResolver().loadDSU(key, (err, dsu) => {
           if (err)
               return _err(`Could not load dsu`, err, callback);
           dsu.readFile(INFO_PATH, (err, data) => {
               if (err)
                   return _err(`Could not read file at ${INFO_PATH}`, err, callback);
               try {
                   const result = JSON.parse(data);
                   callback(undefined, result);
               } catch(e) {
                   _err(`Could not parse info file`, err, callback);
               }
           })
        });
    }
}

module.exports = WebComponentService;

},{"../constants":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/constants.js","./utils":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/utils.js"}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/WebcLocaleService.js":[function(require,module,exports){
/**
 * @module locale
 */

/**
 * This service depends on WebCardinal's translation API
 *
 * Integrates with {@link WebCardinal}'s translation model, and natively integrates into controllers and their model
 */
function LocaleService(){
    if (!WebCardinal)
        throw new Error("Could not find WebCardinal");

    const supported = [];

    const getLocale = () => WebCardinal.language;

    const setLocale = (locale) => {
        if (!(locale in supported))
            throw new Error("Provided locale not supported");
        WebCardinal.language = locale;
        this.loadLocale();
    }

    const _genSupported = () => {
        Object.keys(WebCardinal.translations).forEach(a => {
            supported.push(a);
        })
    };

    _genSupported();

    /**
     * Loads the current locale
     */
    this._loadLocale = function(controller){
        return controller.translationModel;
    }

    /**
     *
     * @param model
     * @param translationKey
     * @return {*}
     */
    const parseTranslationModel = function(model, translationKey){
        const index = translationKey.indexOf('.');
        if (index === -1)
            return model[translationKey];

        return parseTranslationModel(model[translationKey.substring(0, translationKey.indexOf('.'))],
            translationKey.substring(index + 1));
    }

    /**
     * Retrieves the translation information from WebCardinal
     * @param {string} pageName if contains '.' it will be translated into hierarchy in json object (just one level currently supported)
     * @param {WebcController} controller
     * @returns {object} the translation object for the provided page in the current language
     */
    this.getByPage = function(pageName, controller){
        let locale = this._loadLocale(controller);
        if (!locale){
            console.log("no locale set");
            return {};
        }

        locale = locale.toObject();
        if (!pageName)
            return locale;
        if (pageName.includes("."))
            return parseTranslationModel(locale, pageName);
        return locale[pageName];
    }
}

/**
 * Util function to merge JSON objects according to a specified priority
 */
const merge = function(target, source){
    for (const key of Object.keys(source))
        if (source[key] instanceof Object)
            Object.assign(source[key], merge(target[key] ? target[key] : {}, source[key]))
    Object.assign(target || {}, source)
    return target;
}

/**
 * Binds the translation model to the controller and its setModel method
 */
const bindToController = function(controller, page){
    if (!controller.localized) {
        let getter = controller.initializeModel;
        controller.initializeModel = () => {
            let locale = localeService.getByPage(page, controller);
            if (!locale){
                console.log(`No translations found for page ${page}`);
                return getter();
            }
            locale = JSON.parse(JSON.stringify(locale));
            let model = getter();
            return merge(locale, model);
        };
        controller.localized = true;
    }
}

let localeService;

module.exports = {
    /**
     * Returns the instance of the LocaleService and binds the locale info to the controller via {@link bindToController}
     * @param {WebcController} controller: the current controller
     * @param {string} page: the name of the view. Must match an existing key in {@link WebCardinal#translations}
     * @returns {LocaleService}
     */
    bindToLocale: function (controller, page){
        if (!localeService)
            localeService = new LocaleService();
        bindToController(controller, page);
        return localeService;
    }
}
},{}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/strategy.js":[function(require,module,exports){
/**
 * DSU creation strategies:
 *  - **Simple:** Users the direct OpenDSU API. Only works if the APIHub is not in authorized mode;
 *  - **Authorized:** Uses the DSUFabric and {@link DSUBuilder} to ensure transactions and permissions
 * @module services
 */
const STRATEGY = {
    AUTHORIZED: "authorized",
    SIMPLE: "simple"
}

module.exports = STRATEGY;
},{}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/utils.js":[function(require,module,exports){
/**
 * @module utils
 */

/**
 * Provides Util functions and Methods as well as caching for the open DSU resolver and {@Link DSUBuilder}
 */

let resolver, DSUService, keyssi;

/**
 * util function to get the env type.
 * Needs openDSU to be loaded to have access to $$ regardless of environment
 * @return {string} the environment type - nodejs or
 */
function getEnv(){
	return $$.environmentType;
}

/**
 * for singleton use
 * @returns {function} resolver
 */
function getResolver(){
	if (!resolver)
		resolver = require('opendsu').loadApi('resolver');
	return resolver;
}

/**
 * for singleton use
 * @returns {function} resolver
 */
function getKeySSISpace(){
	if (!keyssi)
		keyssi = require('opendsu').loadApi('keyssi');
	return keyssi;
}

/**
 * for singleton use
 * @returns {DSUService}
 */
function getDSUService(){
	if (!DSUService)
		DSUService = new (require('./DSUService'));
	return DSUService;
}

/**
 * Convenience method to select the appropriate resolver method to use depending on the key
 * @param keySSI
 * @returns {function} the appropriate resolver method for creating dsus {@link resolver#createDSU}/{@link resolver#createDSUForExistingSSI}
 */
function selectMethod(keySSI){
	if (['array', 'const'].indexOf(keySSI.getTypeName()) > -1)
		return getResolver().createDSUForExistingSSI;
	return getResolver().createDSU;
}

/**
 * Util method to recursively create folders from a list.
 * Useful to create mount folders
 * @param {Archive} dsu
 * @param {string[]} folders
 * @param {function(err, string[])} callback the folders there where actually created (didn't already exist)
 */
function createDSUFolders(dsu, folders, callback){
	let created = [];
	let iterator = function(folderList){
		let folder = folderList.shift();
		if (!folder)
			return callback(undefined, created);
		dsu.readDir(folder, (err, files) => {
			if (!err) {
				console.log(`Found already existing folder at ${folder}. No need to create...`)
				return iterator(folderList);
			}
			dsu.createFolder(folder, (err) => {
				if (err)
					return callback(err);
				created.push(folder);
				iterator(folderList);
			});
		});
	}
	iterator(folders.slice());
}

const constants = require('opendsu').constants;
const system = require('opendsu').loadApi('system');

/**
 * Util Method to select POST strategy per DSU api.
 * - Forked from PrivateSky
 * - refactored for server side use compatibility
 * @param {string} apiname
 * @returns {doPost} postHandler
 */
function getPostHandlerFor(apiname){

	function getBaseURL(){
		switch ($$.environmentType) {
			case constants.ENVIRONMENT_TYPES.SERVICE_WORKER_ENVIRONMENT_TYPE:
				let scope = self.registration.scope;

				let parts = scope.split("/");
				return `${parts[0]}//${parts[2]}`;

			case constants.ENVIRONMENT_TYPES.BROWSER_ENVIRONMENT_TYPE:
				const protocol = window.location.protocol;
				const host = window.location.hostname;
				const port = window.location.port;

				return `${protocol}//${host}:${port}`;

			case constants.ENVIRONMENT_TYPES.WEB_WORKER_ENVIRONMENT_TYPE:
				return self.location.origin;

			case constants.ENVIRONMENT_TYPES.NODEJS_ENVIRONMENT_TYPE:
				let baseUrl = system.getEnvironmentVariable(constants.BDNS_ROOT_HOSTS);
				if (typeof baseUrl === "undefined") {
					baseUrl = "http://localhost:8080";
				} else {
					const myURL = new URL(baseUrl);
					baseUrl = myURL.origin;
				}
				if (baseUrl.endsWith("/")) {
					baseUrl = baseUrl.slice(0, -1);
				}
				return baseUrl;

			default:
		}
	}

	function doPost(url, data, options, callback) {
		const http = require("opendsu").loadApi("http");
		if (typeof options === "function") {
			callback = options;
			options = {};
		}

		if (typeof data === "function") {
			callback = data;
			options = {};
			data = undefined;
		}

		const baseURL = getBaseURL();
		url = `${baseURL}${url}#x-blockchain-domain-request`
		http.doPost(url, data, options, (err, response) => {
			if (err)
				return callback(err);
			callback(undefined, response);
		});
	}
	return doPost;
}

/**
 * Wrapper around
 * <pre>
 *     OpenDSUSafeCallback(callback)(createOpenDSUErrorWrapper(msg, err));
 * </pre>
 * @param msg
 * @param err
 * @param callback
 * @protected
 */
const _err = function(msg, err, callback){
	return OpenDSUSafeCallback(callback)(createOpenDSUErrorWrapper(msg, err));
}

module.exports = {
	getResolver,
	getKeySSISpace,
	getDSUService,
	getPostHandlerFor,
	selectMethod,
	createDSUFolders,
	getEnv,
	_err
}

},{"./DSUService":"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/pdm-dsu-toolkit/services/DSUService.js","opendsu":false}]},{},["/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/ctr-dsu-wizard/builds/tmp/wizard_intermediar.js"])
                    ;(function(global) {
                        global.bundlePaths = {"wizard":"build/bundles/wizard.js"};
                    })(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
                