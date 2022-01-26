// skip test
//process.exit(0);

// usage: node [nodeopts] testPatientSsapp.js [opts]
// nodeopts:
//    --unhandled-rejections=strict to abort on unhandled exception
// opts:
//    --fakeServer=true lunch a local server on a random port

process.env.NO_LOGS = true;

const path = require('path');

require("../../privatesky/psknode/bundles/testsRuntime");

const tir = require("../../privatesky/psknode/tests/util/tir");
const dc = require("double-check");
const assert = dc.assert;

// project definitions
const wizard = require('../../ctr-dsu-wizard');

const dt = require('../../pdm-dsu-toolkit/services/dt');

let domains = ['ctr'];
let testName = 'trust-loader-config-test';

const defaultOps = {
    timeout: 30000000,
    fakeServer: false,
    app: "patient-ssapp",
    pathToApps: "../../"
};

const argParser = function(args){
    let config = JSON.parse(JSON.stringify(defaultOps));
    if (!args)
        return config;
    args = args.slice(2);
    const recognized = Object.keys(config);
    const notation = recognized.map(r => '--' + r);
    args.forEach(arg => {
        if (arg.includes('=')){
            let splits = arg.split('=');
            if (notation.indexOf(splits[0]) !== -1) {
                let result;
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
};

let conf = argParser(process.argv);

const launchTestServer = function(timeout, testFunction) {     // the test server framework
    assert.callback('Launch API Hub', (testFinished) => {
        dc.createTestFolder(testName, (err, folder) => {
            tir.launchApiHubTestNode(10, folder, err => {
                if (err)
                    throw err;
                tir.addDomainsInBDNS(folder,  domains, (err, bdns) => {    // not needed if you're not working on a custom domain
                    if (err)
                        throw err;
                    console.log('Updated bdns', bdns);
                    testFunction(testFinished);
                });
            });
        });
    }, timeout);
};


/**
 * Generate an object that pdm-trust-loaded is expecting to create the wallet.
 * The properties in that object should match 
 * @param {number} aRandomId not used. Should be the future patient ID.
 * @returns {object}
 */
const generateSecrets = function(aRandomId) {
    return {
        "firstname": {
            "secret": "John"+aRandomId,
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
};

function impersonateDSUStorage(dsu) {
    dsu.directAccessEnabled = false;
    dsu.enableDirectAccess = (callback) => callback();

    const setObject = function (path, data, callback) {
        try {
            dsu.writeFile(path, JSON.stringify(data), callback);
        } catch (e) {
            callback(createOpenDSUErrorWrapper("setObject failed", e));
        }
    };

    const getObject = function (path, callback) {
        dsu.readFile(path, (err, data) => {
            if (err)
                return callback(createOpenDSUErrorWrapper("getObject failed", err));

            try {
                data = JSON.parse(data);
            } catch (e) {
                return callback(createOpenDSUErrorWrapper(`Could not parse JSON ${data.toString()}`, e));
            }
            callback(undefined, data);
        });
    };

    dsu.getObject = getObject;
    dsu.setObject = setObject;
    return dsu;
};
 
const parseEnvJS = function(strEnv){
    return JSON.parse(strEnv.replace(/^export\sdefault\s/, ''));
};

const getEnvJs = function(app, callback){
    const appPath = path.join(process.cwd(), conf.pathToApps, "trust-loader-config", app, "loader", "environment.js");
    require('fs').readFile(appPath, (err, data) => {
        if (err)
            return callback(`Could not find Application ${app} at ${{appPath}} : ${err}`);
        console.log("Read env", data.toString());
        return callback(undefined, parseEnvJS(data.toString()));
    });
};

const runTest = function(testFinished){
    getEnvJs(conf.app, (err, env) => {
        if (err)
            return testFinished(err);

        let config = require("opendsu").loadApi("config");
        config.autoconfigFromEnvironment(env);

        const appService = new (dt.AppBuilderService)(env);
        const credentials = generateSecrets(Math.round(Math.random() * 999999999));
        appService.buildWallet(credentials, (err, walletSSI, dsu) => {
            if (err)
                return testFinished(err);
            console.log(`App ${env.appName} created with credentials ${JSON.stringify(credentials, undefined, 2)}.\nSSI: ${walletSSI}`);
            const dsuStorage = impersonateDSUStorage(dsu.getWritableDSU());
            
            /* Simple write/read test.
            dsuStorage.writeFile('/data', JSON.stringify({ key1: "prop1" }), (err) => {
                if (err)
                    return testFinished(err);
                dsuStorage.readFile('/data', (err, data) => {
                    console.log(err, JSON.parse(data.toString()));
                    testFinished(err);
                });
            });
            */
           
            wizard.Managers.getParticipantManager(dsuStorage, true, (err, participantManager) => {
                if (err) 
                    return testFinished(err);
                console.log(`${conf.app} instantiated\ncredentials:`);
                console.log(credentials);
                console.log(`SSI: ${walletSSI}`);
                participantManager.readPersonalHealthInfo( (err, phi) => {
                    if (err)
                        return testFinished(err);
                    assert.false(phi); // Personal Health Info must be undefined
                    participantManager.writePersonalHealthInfo( { phi: "Hello" }, (err) => {
                        if (err)
                            return testFinished(err);
                        participantManager.readPersonalHealthInfo( (err, phi) => {
                            if (err)
                                return testFinished(err);
                            assert.true(phi);
                            testFinished();
                        });
                    });
                });
            });
        });
    });
};

if (conf.fakeServer){
    process.env.PSK_CONFIG_LOCATION = process.cwd();
    launchTestServer(conf.timeout, runTest);
} else {
    runTest((err) => {
        if (err)
            console.log("Error", err);
        console.log(`Test ${testName} finished`);
    });
}



