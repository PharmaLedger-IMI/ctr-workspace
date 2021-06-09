import constants from "../../constants.js";

class CtrMatchService {
    constructor() {
        this.openDSU = require('opendsu');
    }

    submit() {

    }
}

let ctrMs;

export default function getCtrMatchService(){
    if (!ctrMs)
        ctrMs = new CtrMatchService();
    return ctrMs;
}

