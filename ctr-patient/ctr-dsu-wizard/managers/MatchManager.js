const { ANCHORING_DOMAIN, DB, DEFAULT_QUERY_OPTIONS, ENV_URL_LOCALHOST, ENV_URL_LOCALHOST_REST, ENV_URL_DEV_PDM, ENV_URL_DEV2_PDM, ENV_URL_TST_PDM, ENV_URL_TST2_PDM } = require('../constants');
const Manager = require("../../pdm-dsu-toolkit/managers/Manager");
const Match = require('../model/Match');
const { MatchRequest } = require('../model');


/**
 * Match Manager Class - concrete manager for Matches.
 * @param {ParticipantManager} participantManager the top-level manager for this participant, which knows other managers.
 */
class MatchManager extends Manager {

    constructor(participantManager) {
        super(participantManager, DB.matches, ['submittedOn']);
        this.envUrl = "http://localhost:8080"; // default localhost development
        this.matchRequestService = new (require('../services/MatchRequestService'))(ANCHORING_DOMAIN);
    }

    /**
     * Must wrap the DB entry in an object like:
     * <pre>
     *     {
     *         index1: ...
     *         index2: ...
     *         value: item
     *     }
     * </pre>
     * so the DB can be queried by each of the indexes and still allow for lazy loading
     * @param {string} key
     * @param {Order} item
     * @param {string|object} record
     * @return {object} the indexed object to be stored in the db
     * @protected
     * @override
     */
    _indexItem(key, item, record) {
        return {...super._indexItem(key, item, record), submittedOn: item.submittedOn};
    }


    /**
     * Eliminate rejected trials,
     * and sort an array of MatchResultClinicalTrial[] by ascending
     * travelDistanceKm, and then by descendant matchConfidenceToDisplay.
     * @param {Match} match
     * @param {MatchResultClinicalTrial[]} trials 
     * @returns {MatchResultClinicalTrial[]} a new Array
     */
     eliminateAndSortMatchResult(match) {
        const self = this;
        let mtctCollection = [];
        if (match && match.matchResult && match.matchResult.trials && Array.isArray(match.matchResult.trials)) {
            match.matchResult.trials.forEach((mtct) => {
                if (self.enrichMatchResultClinicalTrial(mtct) || match.displayNoMatch)
                    mtctCollection.push(mtct);
            });
        }
        // sort by descending confidence, and then by ascendant travelDistanceKm
        mtctCollection.sort((mtct1, mtct2) => {
            if (mtct1.matchConfidenceToDisplay == mtct2.matchConfidenceToDisplay
                && mtct1.clinicalTrial.clinicalSite.address.location.travDistMiles && mtct2.clinicalTrial.clinicalSite.address.location.travDistMiles
            ) {
                return mtct1.clinicalTrial.clinicalSite.address.location.travDistMiles - mtct2.clinicalTrial.clinicalSite.address.location.travDistMiles;
            }
            return mtct2.matchConfidenceToDisplay - mtct1.matchConfidenceToDisplay;
        });
        return mtctCollection;
    }

    /**
     * Enrich a ClinicalSite object with properties travDistKm when travDistMiles exist.
     * @param {ClinicalSite} cs 
     * @returns true if the object was enriched. false if not.
     */
    enrichClinicalSiteTravDistKm(cs) {
        if (!cs.address.location.travDistMiles) {
            return false;
        }
        cs.address.location['travDistKm'] = (Math.round(cs.address.location.travDistMiles * 1.60934 * 100) / 100).toFixed(2);
        return true;
    }

    /**
     * Enrich a ClinicalTrial object with properties travDistKm for each ClinicalSite
     * when travDistMiles exist.
     * Also add a ClinicalTrial.clinicalSiteExtra string with "[...3 more]"
     * with the count of sites. (An empty string if <=1 sites).
     * @param {ClinicalTrial} ctr
     */
    enrichClinicalTrialTravDistKm(ctr) {
        this.enrichClinicalSiteTravDistKm(ctr.clinicalSite);
        ctr.clinicalSites.forEach( (cs) => {
            this.enrichClinicalSiteTravDistKm(cs);
        });
        ctr.clinicalSiteExtra = '';
        if (ctr.clinicalSites && ctr.clinicalSites.length>1) {
            ctr.clinicalSiteExtra = ` [...${ctr.clinicalSites.length-1} more]`;
        }
    }

    /**
     * Enrich a ClinicalTrial object array with properties travDistKm for each ClinicalSite
     * when travDistMiles exist.
     * @param {ClinicalTrial[]} ctrArray
     */
    enrichClinicalTrialArrayTravDistKm(ctrArray) {
        ctrArray.forEach( (ctr) => { this.enrichClinicalTrialTravDistKm(ctr); });
    }

    /**
     * Enrich object with properties
     * matchConfidenceToDisplay (a string with a number >= 0.0 and <= 100.0)
     * matchConfidenceToDisplayStr (a string with a message)
     * and clinicalTrial.travDistKm.
     * @param {object} mtct See MatchResultClinicalTrial.dto.ts for expected fields
     * @returns true if this trial matches. false if not.
     */
    enrichMatchResultClinicalTrial(mtct) {
        // If there is travel distance, convert it to Km
        this.enrichClinicalTrialTravDistKm(mtct.clinicalTrial);
        mtct.matchConfidenceToDisplay = (0.0).toFixed(1);
        mtct.matchConfidenceToDisplayStr = "No match!";
        if (mtct.criteriaMatchedCount >= mtct.criteriaCount) {
            mtct.matchConfidenceToDisplay = ((mtct.criteriaConfidenceCount / mtct.criteriaCount)*100.0).toFixed(1); // webcardinal seems unable to support complex @expressions so we calculate it here.
            mtct.matchConfidenceToDisplayStr = mtct.matchConfidenceToDisplay+"%";
            return true;
        }
        return false;
    }

    /**
     * Called once to set a URL that is being used on this environment.
     * @param {string} url 
     */
    envSetUrl(url) {
        console.log("Running on URL", url);
        this.envUrl = url;
    }

    envGetUrl() {
        return this.envUrl;
    }

    /**
     * Running on localhost ? Laptop.
     * @returns true if the current URL starts with http://localhost
     */
    envIsLocalhost() {
        return this.envUrl.startsWith(ENV_URL_LOCALHOST);
    }

    envIsDevPDM() {
        return this.envUrl.startsWith(ENV_URL_DEV_PDM)
            || this.envUrl.startsWith(ENV_URL_DEV2_PDM);
    }

    envIsTstPDM() {
        return this.envUrl.startsWith(ENV_URL_TST_PDM)
            || this.envUrl.startsWith(ENV_URL_TST2_PDM);
    }

    /**
     * If url if a /borest URL, replace it with a proper one
     * for the current environment.
     * @param {String} url 
     * @returns a string to replace url
     */
    envReplaceRestUrl(url) {
        // #44 TODO workaround PWA
        if (!url || typeof url != "string")
            return url;
        // switch based on env
        if (this.envIsLocalhost()) {
            const urlArray = [ENV_URL_DEV_PDM, ENV_URL_DEV2_PDM, ENV_URL_TST_PDM, ENV_URL_TST2_PDM];
            for(const u of urlArray) {
                const uRest = u+'/borest';
                if (url.startsWith(uRest)) {
                    //console.log("REPLACED ENV_URL_LOCALHOST_REST", ENV_URL_LOCALHOST_REST);
                    return ENV_URL_LOCALHOST_REST+url.substring(u.length); // #44 TODO PWA blocks localhost, but does not block 127.0.0.1
                }
            }
        } else if (this.envIsDevPDM()) {
            const urlArray = [ENV_URL_LOCALHOST, ENV_URL_DEV_PDM, ENV_URL_TST_PDM, ENV_URL_TST2_PDM];
            for(const u of urlArray) {
                const uRest = u+'/borest';
                if (url.startsWith(uRest)) {
                    return ENV_URL_DEV2_PDM+url.substring(u.length);
                }
            }
        } else if (this.envIsTstPDM()) {
            const urlArray = [ENV_URL_LOCALHOST, ENV_URL_DEV_PDM, ENV_URL_DEV2_PDM, ENV_URL_TST_PDM];
            for(const u of urlArray) {
                const uRest = u+'/borest';
                if (url.startsWith(uRest)) {
                    return ENV_URL_TST2_PDM+url.substring(u.length);
                }
            }
        }
        // default - do not replace the URL
        return url;
    }

    /**
     * Iterate through LForm items, and replace externallyDefined URLs.
     * @param {Array} items 
     * @returns items
     */
    envReplaceExternallyDefined(items) {
        if (!items || !Array.isArray(items))
            return items;
        items.forEach( (item) => {
            if ( item.externallyDefined ) {
                item.externallyDefined = this.envReplaceRestUrl(item.externallyDefined);
            }
        });
        return items;
    }

    /**
     * Lists all submitted matchs requests.
     * @param {boolean} [readDSU] defaults to true. decides if the manager loads and reads from the dsu's {@link INFO_PATH} or not
     * @param {object} [options] query options. defaults to {@link DEFAULT_QUERY_OPTIONS}
     * @param {function(err, Match[])} callback
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

        let self = this;

        self.query(options.query, options.sort, options.limit, (err, records) => {
            if (err)
                return self._err(`Could not perform query`, err, callback);
            if (!readDSU)
                return callback(undefined, records); // return the record array
            self._iterator(records.map(r => r.matchRequestConstSSIStr), self._getDSUInfo.bind(self), (err, result) => {
                if (err)
                    return self._err(`Could not parse ${self._getTableName()}s ${JSON.stringify(records)}`, err, callback);
                console.log(`Parsed ${result.length} ${self._getTableName()}s`);
                callback(undefined, result);
            });
        });
    }

    /**
     * Returns array of medical conditions in the format specified by /borest/lforms/medicalconditions
     * @param {function(err, Array)} callback
     */
    getMedicalConditions(callback) {
        //const url = "http://localhost:3000/borest/lforms/medicalconditions"; // TODO EVIL hardcoded URL. See #44
        const url = this.envReplaceRestUrl("https://ctr2-dev.pharmaledger.pdmfc.com/borest/lforms/medicalconditions"); // TODO EVIL hardcoded URL. See also #44
        this.httpGetRequest(url, callback);
    }

    /**
     * Returns array of locationss in the format specified by /borest/lforms/locations
     * @param {function(err, Array)} callback
     */
    getLocations(callback) {
        const url = this.envReplaceRestUrl("https://ctr2-dev.pharmaledger.pdmfc.com/borest/lforms/locations"); // TODO EVIL hardcoded URL. See also #44
        this.httpGetRequest(url, callback);
    }

    /**
     * Returns array of locations for city centers in the format specified by /borest/ctrial/locations
     * @param {function(err, Array)} callback
     */
     getLocationsCityCenterCoords(limit, callback) {
        const url = this.envReplaceRestUrl(`https://ctr2-dev.pharmaledger.pdmfc.com/borest/ctrial/location?center=true&limit=${limit}`); // TODO EVIL hardcoded URL. See also #44
        this.httpGetRequest(url, callback);
    }

    /**
     * Make a GET Request
     * @param {string} url
     * @param {function(err, any)} callback
     */
    httpGetRequest(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status === 200) {
                callback(null, xhr.response);
            } else {
                callback(xhr.statusText, xhr.response);
            }
        };
        xhr.send();
    }

    /**
     * Submit a query to search for trials.
     * @param {object} query an object that will be converted with JSON.stringify.
     * @param {function(err, paginatedDto)} callback
     * @returns {undefined}
     */
    submitFindTrials(query, callback) {
        let self = this;
        this.matchRequestService.submitFindTrials(query, (err, res) => {
            console.log("submitFindTrials", err, res);
            if (err)
                return callback(err);
            let resObj = res;
            if (typeof(res) === 'string') {
                resObj = JSON.parse(res);
            }
            return callback(err, resObj);
        });
    }

    /**
     * Create a const DSU for MatchRequest, and create a wrapper Match.
     * @param {matchRequest} matchRequest an object that will be converted with JSON.stringify.
     * @param {function(err, matchResult)} callback
     * @returns {undefined}
     */
    submitMatchRequest(matchRequest, callback) {
        let self = this;
        if (matchRequest.constKeySSIStr) {
            // Something went wrong on previous submission attempt.
            // When re-submitting, generate a new id, pretend it is a new MatchRequest.
            matchRequest.id = (new MatchRequest()).id
            matchRequest.constKeySSIStr = undefined;
        }
        matchRequest.submittedOn = new Date();
        self.matchRequestService.create(matchRequest, (err, matchRequestConstDSU) => {
            if (err)
                return callback(err);
            matchRequestConstDSU.getKeySSIAsObject((err, matchRequestConstKeySSI) => {
                if (err)
                    return callback(err);
                matchRequest.constKeySSIStr = matchRequestConstKeySSI.getIdentifier(true);
                this.matchRequestService.submit(matchRequest, (err, res) => {
                    console.log("submit", err, res);
                    if (err)
                        return callback(err);
                    const matchResult = JSON.parse(res);
                    const aMatch = new Match(matchRequest, matchResult);
                        self.insertRecord(aMatch.id, aMatch, (err) => {
                        return callback(err, aMatch);
                    });
                });
            });
        });
    }



    /**
     * Submit partial MatchRequest (with ghiForm and trialPrefs) to the server,
     * and set matchRequest.conditionBlank and matchRequest.trialBlank.
     * @param {matchRequest} matchRequest an object that will be converted with JSON.stringify.
     * @param {function(err)} callback
     * @returns {undefined}
     */
     submitTrialPrefs(matchRequest, callback) {
        let self = this;
        matchRequest.trialPrefsError = undefined;
        matchRequest.trialPrefsWarning = undefined;
        matchRequest.trials = undefined;
        this.matchRequestService.submitTrialPrefs(matchRequest, (err, res) => {
            console.log("submitTrialPrefs", err, res);
            if (err)
                return callback(err);
            let resObj = res;
            if (typeof(res) === 'string') {
                resObj = JSON.parse(res);
            }
            matchRequest.trialPrefsError = resObj.trialPrefsError;
            matchRequest.trialPrefsWarning = resObj.trialPrefsWarning;
            matchRequest.conditionBlank = resObj.conditionBlank;
            matchRequest.trialBlank = resObj.trialBlank;
            matchRequest.trials = resObj.trials;
            return callback(err);
        });
    }

}

let matchManager;
/**
 * @param {ParticipantManager} participantManager
 * @param {boolean} force
 * @returns {MatchManager}
 */
const getMatchManager = function (participantManager, force, callback) {
    if (!matchManager || force)
        matchManager = new MatchManager(participantManager);
    return matchManager;
}

module.exports = getMatchManager;
