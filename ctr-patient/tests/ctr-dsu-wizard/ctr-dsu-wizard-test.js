process.env.NO_LOGS = true;
//process.env.PSK_CONFIG_LOCATION = process.cwd();


const path = require('path');

/*
const test_bundles_path = path.join('../../privatesky/psknode/bundles', 'testsRuntime.js');
const pskruntime_path = path.join('../../privatesky/psknode/bundles', 'pskruntime.js');
require(test_bundles_path);
require(pskruntime_path);
*/

require(path.join('../../privatesky/psknode/bundles', 'openDSU.js'));       // the whole 9 yards, can be replaced if only
const dt = require('./../../pdm-dsu-toolkit/services/dt');

/*
const dc = require("double-check");
const assert = dc.assert;
const tir = require("../../privatesky/psknode/tests/util/tir");
*/

const wizard = require('../../ctr-dsu-wizard');
const getParticipantManager = wizard.Managers.getParticipantManager;

const {MATCH_REQUEST_EXAMPLE} = require("./matchrequest-filled");


const defaultOps = {
    pathToApps: "../../",
};

let domain = 'ctr';
let testName = 'ctr-dsu-wizard-test'
let credentials = {
    /* id is now generated from generateDID()
    "id": {
        "secret": ""+Math.random().toString(36),
        "public": true,
        "required": true
    },
    */ 
    "firstname": {
        "secret": "John",
        "public": true,
        "required": true
    }, 
    "lastname": {
        "secret": "McTester",
        "public": true,
        "required": true
    }, 
    "email": {
        "secret": "my-contact@email-provider.com",
        "public": true,
        "required": true
    }, 
    "pass": {
        "required": true,
        "secret": "This1sSuchAS3curePassw0rd"
    },
    "passrepeat": {
        "required": true,
        "secret": "This1sSuchAS3curePassw0rd"
    }
};

const argParser = function(defaultOpts, args){
    let config = JSON.parse(JSON.stringify(defaultOpts));
    if (!args)
        return config;
    args = args.slice(2);
    const recognized = Object.keys(config);
    const notation = recognized.map(r => '--' + r);
    args.forEach(arg => {
        if (arg.includes('=')){
            let splits = arg.split('=');
            if (notation.indexOf(splits[0]) !== -1) {
                let result
                try {
                    result = eval(splits[1]);
                } catch (e) {
                    result = splits[1];
                }
                config[splits[0].substring(2)] = result;
            }
        }
    });
    return config;
}

function impersonateDSUStorage(dsu){
    dsu.directAccessEnabled = false;
    dsu.enableDirectAccess = (callback) => callback();

    const setObject = function(path, data, callback) {
        try {
            dsu.writeFile(path, JSON.stringify(data), callback);
        } catch (e) {
            callback(createOpenDSUErrorWrapper("setObject failed", e));
        }
    }

    const getObject = function(path, callback) {
        dsu.readFile(path, (err, data) => {
           if (err)
               return callback(createOpenDSUErrorWrapper("getObject failed" ,err));

           try{
               data = JSON.parse(data);
           } catch (e){
               return callback(createOpenDSUErrorWrapper(`Could not parse JSON ${data.toString()}`, e));
           }
           callback(undefined, data);
        });
    }

    dsu.getObject = getObject;
    dsu.setObject = setObject;
    return dsu;
 }

const parseEnvJS = function(strEnv){
    return JSON.parse(strEnv.replace(/^export\sdefault\s/, ''));
}

const getEnvJs = function(app, pathToApps,callback){
    const appPath = require('path').join(process.cwd(), pathToApps, "trust-loader-config", app, "loader", "environment.js");
    require('fs').readFile(appPath, (err, data) => {
        if (err)
            return callback(`Could not find Application ${app} at ${{appPath}} : ${err}`);
        return callback(undefined, parseEnvJS(data.toString()));
    });
}

const instantiateSSApp = function(app, pathToApps, dt, credentials, callback){
    getEnvJs(app, pathToApps,(err, env) => {
        if (err)
            throw err;

        let config = require("opendsu").loadApi("config");
        config.autoconfigFromEnvironment(env);

        const appService = new (dt.AppBuilderService)(env);
        appService.buildWallet(credentials, (err, keySII, dsu) => {
            if (err)
                throw err;
            console.log(`App ${env.appName} created with credentials ${JSON.stringify(credentials, undefined, 2)}.\nSSI: ${{keySII}}`);
            callback(undefined, keySII, dsu, credentials);
        });
    });
}

const lhcFormFindItemByLocalQuestionCode = function(form, localQuestionCode) {
    let itemFound = undefined;
    form.items.forEach( (item) => {
        if (item && item.localQuestionCode && localQuestionCode==item.localQuestionCode)
            itemFound = item;
    });
    return itemFound;
}

const lhcFormCopyAnswers = function(formSrc, formDst) {
    formSrc.items.forEach( (itemSrc) => {
        if (itemSrc.localQuestionCode) {
            const itemDst = lhcFormFindItemByLocalQuestionCode(formDst, itemSrc.localQuestionCode);
            if (itemDst) {
                if (itemSrc.value) {
                    console.log("copy answer for q "+itemSrc.localQuestionCode, itemSrc.value);
                    itemDst['value'] = itemSrc.value;
                }
                if (itemSrc.unit)
                    itemDst['unit'] = itemSrc.unit;
            }
        }
    });
}

/* MAIN */
const conf = argParser(defaultOps, process.argv);

instantiateSSApp('patient-ssapp', conf.pathToApps, dt, credentials, (err, walletSSI, walletDSU, credentials) => {
    if (err)
        throw err;
    const dsuStorage = impersonateDSUStorage(walletDSU.getWritableDSU());
    getParticipantManager(dsuStorage, true, (err, participantManager) => {
        if (err)
            throw err;
        console.log(`${conf.app} instantiated\ncredentials:`);
        console.log(credentials);
        //console.log(`ID: ${credentials.id.secret}`);
        console.log(`SSI: ${walletSSI}`);
        const ghiForm = MATCH_REQUEST_EXAMPLE.ghiForm;
        participantManager.writePersonalHealthInfo(ghiForm, (err) => {
            if (err)
                throw err;
            const matchManager = wizard.Managers.getMatchManager(participantManager);
            const applicationManager = wizard.Managers.getApplicationManager(participantManager);
            matchManager.submitFindTrials({}, (err, paginatedDto) => {
                if (err)
                    throw err;
                participantManager.newMatchRequest((err, matchRequest) => {
                    console.log(err, matchRequest);
                    if (err)
                        throw err;
                    // copy only the answers from EXAMPLE
                    // matchRequest.ghiForm = MATCH_REQUEST_EXAMPLE.ghiForm;
                    lhcFormCopyAnswers(MATCH_REQUEST_EXAMPLE.ghiForm, matchRequest.ghiForm);
                    matchManager.envReplaceExternallyDefined(matchRequest.ghiForm.items);
                    matchRequest.trialPrefs = MATCH_REQUEST_EXAMPLE.trialPrefs;
                    matchManager.envReplaceExternallyDefined(matchRequest.trialPrefs.items);
                    //console.log("trialPrefs.items", matchRequest.trialPrefs.items);
                    matchManager.submitTrialPrefs(matchRequest, (err) => {
                        if (err)
                            throw err;
                        //console.log("received matchRequest.conditionBlank ", matchRequest.conditionBlank);
                        //console.log("received matchRequest.trialBlank ", matchRequest.trialBlank);
                        // Use the ...Blank forms returned from the submitTrialPrefs. Copy only the answers from EXAMPLE. 
                        // matchRequest.condition = MATCH_REQUEST_EXAMPLE.condition;
                        matchRequest.condition = JSON.parse(JSON.stringify(matchRequest.conditionBlank));
                        lhcFormCopyAnswers(MATCH_REQUEST_EXAMPLE.condition, matchRequest.condition);
                        // matchRequest.trial = MATCH_REQUEST_EXAMPLE.trial;
                        matchRequest.trial = JSON.parse(JSON.stringify(matchRequest.trialBlank));
                        lhcFormCopyAnswers(MATCH_REQUEST_EXAMPLE.trial, matchRequest.trial);
                        matchManager.submitMatchRequest(matchRequest, (err, match) => {
                            if (err)
                                throw err;
                            console.log("written matchRequestConstKeySSI ", match.matchRequestConstSSIStr);
                            // apply to first mtct
                            const mtctArray = match.matchResult.trials;
                            if (!Array.isArray(mtctArray) || mtctArray.length<=0) {
                                throw new Error("Mtct is not an array!");
                            }
                            const mtctZero = mtctArray[0];
                            const application = {
                                name: credentials.firstname.secret+" "+credentials.lastname.secret,
                                email: credentials.email.secret,
                                phone: "+351-0-0000000",
                                matchRequest: match.matchRequestConstSSIStr,
                                clinicalTrial: mtctZero.clinicalTrial.id,
                                clinicalTrialName: mtctZero.clinicalTrial.name,
                                clinicalSite: mtctZero.clinicalTrial.clinicalSite.id,
                                clinicalSiteName: mtctZero.clinicalTrial.clinicalSite.name,
                                sponsorName: mtctZero.clinicalTrial.sponsor.name,
                                medicalConditionName: mtctZero.clinicalTrial.clinicalTrialMedicalConditions[0].medicalCondition.name,
                                matchConfidence: "100.0",
                            };
                            console.log("Going to submit application", application );
                            applicationManager.submitApplication(application, (err, res) => {
                                if (err) {
                                    throw err;
                                }
                                console.log("written Application ", res);
                            })

                        });
                    });
                });
            });
        });
    });
});

/*
assert.callback('Launch API Hub', (testFinishCallback) => {
    dc.createTestFolder(testName, (err, folder) => {
        tir.launchApiHubTestNode(10, folder, err => {
            if (err)
                throw err;
            tir.addDomainsInBDNS(folder, [domain], (err, bdns) => {
                if (err)
                    throw err;
                console.log('Updated bdns', bdns);
                instantiateSSApp('patient-ssapp', conf.pathToApps, dt, credentials, (err, walletSSI, walletDSU, credentials) => {
                    if (err)
                        throw err;
                    const dsuStorage = impersonateDSUStorage(walletDSU.getWritableDSU());
                    getParticipantManager(dsuStorage, true, (err, participantManager) => {
                        if (err)
                            throw err;
                        console.log(`${conf.app} instantiated\ncredentials:`);
                        console.log(credentials);
                        console.log(`ID: ${credentials.id.secret}`);
                        console.log(`SSI: ${walletSSI}`);
                        testFinishCallback();
                    });
                });
            });
        });
    });
}, 3000);
*/
