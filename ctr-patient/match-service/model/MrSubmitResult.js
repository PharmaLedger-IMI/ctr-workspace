const {ACDC_STATUS} = require('../constants')

/**
 * Represents the scan resul from ACDC
 * @class ScanResult
 * @module Model
 */
class MrSubmitResult{
    /**
     * {{}} the match result object - to be defined
     */
    mrCheckResult;

    constructor(props){
        if (!!props)
            for(let prop in props)
                if (props.hasOwnProperty(prop))
                    this[prop] = props[prop];
    }
}

module.exports = MrSubmitResult;