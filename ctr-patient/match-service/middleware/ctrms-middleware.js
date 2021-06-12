const {ENDPOINT, HEADERS} = require('../constants');
const MrSubmitResult = require('../model/MrSubmitResult');

/**
 * Reads the request body and parses it to JSON format
 * @param req
 * @param callback
 */
const parseRequestBody = function(req, callback){
    const data = [];

    req.on('data', (chunk) => {
        data.push(chunk);
    });

    req.on('end', () => {
        try {
            req.body = data.length ? JSON.parse(data) : {};
        } catch (e) {
            callback(e);
        }
        callback(undefined, req.body);
    });
}

/**
 * In order to bypass CORS, we need the app to perform a call to its apihub that will
 * then be relayed to the ctr-backoffice-backend server
 * @param {Server} server
 */
function startCtrMsMiddleware(server){
    const http = require('opendsu').loadApi('http');

    server.post(`/ctr-match-service/submit`, (req, res) => {

        const sendResponse = function(response, code = 200){
            res.statusCode = code;
            res.write(JSON.stringify(response));
            res.end();
        }

        parseRequestBody(req, (err, event) => {
            if (err)
                return sendResponse(`Error parsing input ${req.body}: ${err}`, 500);

            http.doPost(ENDPOINT, JSON.stringify(event), HEADERS, (err, result) => {
                if (err)
                    return sendResponse(err, 500);
                result = typeof result === 'string' ? JSON.parse(result) : result;
                return sendResponse(result);
            });
        });
    });
}


module.exports = startCtrMsMiddleware;