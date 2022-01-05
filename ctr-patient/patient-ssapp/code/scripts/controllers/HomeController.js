import { HomeController as BaseHomeController, EVENT_NAVIGATE_TAB, EVENT_REFRESH, EVENT_SSAPP_HAS_LOADED } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Central Controller
 *
 * Controls Application Flow
 *
 * Holds all other Controllers and manages identity, database access and messaging via {@link BaseHomeController} and {@link ParticipantManager}
 * @class HomeController
 * @module controllers
 */
export default class HomeController extends BaseHomeController{
    constructor(element, history) {
        super(element, history);
        let self = this;
        const wizard = require('wizard');
        self.model.version = wizard.Version;
        //console.log("model.version", self.model.version);

        self.on(EVENT_SSAPP_HAS_LOADED, (evt) => {
            console.log("HomeController has-loaded processing "+EVENT_SSAPP_HAS_LOADED);
            self.participantManager.readPersonalHealthInfo( (err, phi) => {
                console.log("HomeController readPersonalHealthInfo done ", err, phi);
                if (err) {
                    console.log(err);
                    return self.showToast(`Failure to load personal health information ${err}`);
                }
                self.model.participant.personalHealthInfo = phi; // undefined if there is none
                // the following seems not to cause any event sending to DashboardController
                //self.send(EVENT_REFRESH, {tab: "tab-dashboard", props: undefined}, {capture: true});
            });
        }, {capture: true});

        self.onTagEvent('home', 'click', () => {
            self.send(EVENT_NAVIGATE_TAB, { tab: "tab-dashboard" }, { capture: true });
        });

        self.on(EVENT_REFRESH, (evt) => {
            console.log("HomeController refresh processing "+EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            self._recheckPersonalHealthInformation();
        });
    }

    /**
     * Extend _navigateToTab on super.
     * @param {object} props - must have a property named tab with the tab name.
     */
    _navigateToTab(props) {
        console.log("HomeController _navigateToTab", props);
        this._recheckPersonalHealthInformation();
        super._navigateToTab(props);
    }

    /**
     * Updates the this.model.personalHealthInfoAbsent with a boolean to check if the personalHealthInfo is absent.
     * @returns true if the health info is absent.
     */
    _recheckPersonalHealthInformation() {
        this.model.personalHealthInfoAbsent = !(this.model.participant && this.model.participant.personalHealthInfo);
        return this.model.personalHealthInfoAbsent;
    }
}
