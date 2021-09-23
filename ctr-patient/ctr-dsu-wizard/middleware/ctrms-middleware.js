const {ENDPOINT_APPLY, ENDPOINT_TRIALFIND, ENDPOINT_TRIALPREFS, ENDPOINT_SUBMIT, HEADERS} = require('./constants');

/**
 * Reads the request body and parses it to JSON format
 * @param req
 * @param callback
 */
const parseRequestBody = function(req, callback){
    let data = '';

    req.on('data', (chunk) => { 
        //console.log("parseRequestBody on data push", chunk);
        data += chunk;
    });

    req.on('end', () => {
        //console.log("parseRequestBody on end", data);
        try {
            req.body = data.length ? JSON.parse(data) : {};
        } catch (e) {
            //console.log("parseRequestBody on end error", e);
            return callback(e);
        }
        callback(undefined, req.body);
    });

    req.on('error', (err) => {
        console.log('parseRequestBody error', err);
        callback(err);
    });
}

/**
 * In order to bypass CORS, we need the app to perform a call to its apihub that will
 * then be relayed to the ctr-backoffice-backend server
 * @param {Server} server
 */
function startCtrMsMiddleware(server){
    const http = require('opendsu').loadApi('http');

    console.log("Registering /ctr-match-service/apply");
    server.post(`/ctr-match-service/apply`, (req, res) => {

        const sendResponse = function(response, code = 200){
            res.statusCode = code;
            res.write(JSON.stringify(response));
            res.end();
        }

        parseRequestBody(req, (err, event) => {
            if (err)
                return sendResponse(`Error parsing input ${req.body}: ${err}`, 500);

            http.doPost(ENDPOINT_APPLY, JSON.stringify(event), HEADERS, (err, result) => {
                if (err)
                    return sendResponse(err, 500);
                result = typeof result === 'string' ? JSON.parse(result) : result;
                return sendResponse(result);
            });
        });
    });

    console.log("Registering /ctr-match-service/trialFind");
    server.post(`/ctr-match-service/trialFind`, (req, res) => {

        const sendResponse = function(response, code = 200){
            res.statusCode = code;
            res.write(JSON.stringify(response));
            res.end();
        }

        parseRequestBody(req, (err, event) => {
            if (err)
                return sendResponse(`Error parsing input ${req.body}: ${err}`, 500);

            http.doPost(ENDPOINT_TRIALFIND, JSON.stringify(event), HEADERS, (err, result) => {
                if (err)
                    return sendResponse(err, 500);
                result = typeof result === 'string' ? JSON.parse(result) : result;
                return sendResponse(result);
            });
        });
    });

    console.log("Registering /ctr-match-service/trialPrefs");
    server.post(`/ctr-match-service/trialPrefs`, (req, res) => {

        const sendResponse = function(response, code = 200){
            res.statusCode = code;
            res.write(JSON.stringify(response));
            res.end();
        }

        parseRequestBody(req, (err, event) => {
            if (err)
                return sendResponse(`Error parsing input ${req.body}: ${err}`, 500);

            http.doPost(ENDPOINT_TRIALPREFS, JSON.stringify(event), HEADERS, (err, result) => {
                if (err)
                    return sendResponse(err, 500);
                result = typeof result === 'string' ? JSON.parse(result) : result;
                return sendResponse(result);
            });
        });
    });

    console.log("Registering /ctr-match-service/submit");
    server.post(`/ctr-match-service/submit`, (req, res) => {

        const sendResponse = function(response, code = 200){
            res.statusCode = code;
            res.write(JSON.stringify(response));
            res.end();
        }

        //console.log("/ctr-match-service/submit Before Parsing request body", req);
        parseRequestBody(req, (err, event) => {
            if (err)
                return sendResponse(`Error parsing input ${req.body}: ${err}`, 500);

            //console.log("/ctr-match-service/submit Parsed request body", event);
            http.doPost(ENDPOINT_SUBMIT, JSON.stringify(event), HEADERS, (err, result) => {
                if (err)
                    return sendResponse(err, 500);
                result = typeof result === 'string' ? JSON.parse(result) : result;
                return sendResponse(result);
            });
        });
    });
}


module.exports = startCtrMsMiddleware;