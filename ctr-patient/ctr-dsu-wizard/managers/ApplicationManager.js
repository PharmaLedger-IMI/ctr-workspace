const {ANCHORING_DOMAIN, DB, DEFAULT_QUERY_OPTIONS,} = require('../constants');
const Manager = require('../../pdm-dsu-toolkit/managers/Manager');
const {Application} = require('../model');

/**
 * Application Manager Class - manager for Clinical Trials Applications, or just "Applications"
 * @param {ParticipantManager} participantManager the top-level manager for this participant, which knows other managers.
 */
class ApplicationManager extends Manager {

    constructor(participantManager) {
        super(participantManager, DB.applications, ['createdOn', 'clinicalTrial', 'id']);
        this.applicationService = new (require('../services/ApplicationService'))(ANCHORING_DOMAIN);
    }

    _indexItem(key, item, record) {
        return {
            ...super._indexItem(key, item, record),
            createdOn: item.createdOn,
            clinicalTrial: item.clinicalTrial,
            id: item.id,
            value: record
        };
    }

    /**
     * Lists all Clinical Trials Applications from patient/participant.
     * @param {boolean} [readDSU] defaults to true. decides if the manager loads and reads from the dsu's or not
     * @param {object} [options] query options. defaults to {@link DEFAULT_QUERY_OPTIONS}
     * @param {function(err, Application[])} callback
     */
    getAll(readDSU, options, callback) {
        const defaultOptions = () => Object.assign({}, DEFAULT_QUERY_OPTIONS);

        if (!callback) {
            if (!options) {
                callback = readDSU;
                options = defaultOptions();
                readDSU = true;
            }
            if (typeof readDSU === 'boolean') {
                callback = options;
                options = defaultOptions();
            }
            if (typeof readDSU === 'object') {
                callback = options;
                options = readDSU;
                readDSU = true;
            }
        }
        options = options || defaultOptions();

        const self = this;
        self.query(options.query, options.sort, options.limit, (err, records) => {
            if (err) {
                return callback(err);
            }
            console.log('ApplicationManager.getAll() records=', records);
            return callback(undefined, records);
            /*
            if (!readDSU) {
                return callback(undefined, records);
            }
            self._iterator(records.map(r => r.constKeySSIStr), self._getDSUInfo.bind(self), (err, result) => {
                if (err) {
                    return self._err(`Could not parse ${self._getTableName()} ${JSON.stringify(records)}`, err, callback);
                }
                console.log(`Parsed ${result.length} ${self._getTableName()}`);
                callback(undefined, result);
            });
            */
        });
    }

    /**
     * Create a const DSU for each  application submitted, persisting clinical trial application into sponsorDB and patient/participant DSU
     * @param {Application} application
     * @param {function(err, result)} callback
     */
    submitApplication(application, callback) {
        let self = this;

        console.log('## ApplicationManager.submitApplication application=', application);
        // persist into sponsorDB
        self.applicationService.applyForATrial(application, (err, res) => {
            if (err) {
                return callback(err);
            }
            let resApplyForATrial;
            try {
                resApplyForATrial = (typeof (res) === 'string') ? JSON.parse(res) : res;
            } catch (err) {
                callback(err);
            }
            const _application = new Application(resApplyForATrial);
            self.insertRecord(_application.id, _application, (err) => {
                return callback(err, _application);
            });
            // persist into DSU
            /*
            self.applicationService.create(_application, (err, applicationConstDSU) => {
                if (err) {
                    callback(err);
                }
                applicationConstDSU.getKeySSIAsObject((err, applicationConstKeySSI) => {
                    if (err) {
                        return callback(err);
                    }
                    _application.constKeySSIStr = applicationConstKeySSI.getIdentifier(true);
                    self.insertRecord(_application.id, _application, (err) => {
                        return callback(err, _application);
                    });
                });
            });
             */
        });
    }
}

let applicationManager;
/**
 * @param {ParticipantManager} participantManager
 * @param {boolean} force
 * @returns {MatchManager}
 */
const getApplicationManager = function (participantManager, force) {
    if (!applicationManager || force) {
        applicationManager = new ApplicationManager(participantManager);
    }
    return applicationManager;
};

module.exports = getApplicationManager;
