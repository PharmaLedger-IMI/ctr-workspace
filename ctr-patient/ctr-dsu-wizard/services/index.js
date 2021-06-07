/**
 * @module ctr-dsu-wizard.services
 */
module.exports = {
    DSUService: require('../../pdm-dsu-toolkit/services/DSUService'),
    MatchRequestService: require('./MatchRequestService'),
    ParticipantService: require('./ParticipantService'),
    WebcLocaleService: require("../../pdm-dsu-toolkit/services/WebcLocaleService"),
    WebComponentService: require("../../pdm-dsu-toolkit/services/WebComponentService"),
    Strategy: require("../../pdm-dsu-toolkit/services/strategy"),
    utils: require('../../pdm-dsu-toolkit/services/utils')
}