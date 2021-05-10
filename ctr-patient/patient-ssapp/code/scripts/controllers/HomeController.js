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

        // should work, but never catches the event - workaround - extend _concludeLoading()
        self.on(EVENT_SSAPP_HAS_LOADED, (evt) => {
            console.log("HomeCOntroller processing "+EVENT_SSAPP_HAS_LOADED);
            self.participantManager.readPersonalHealthInfo( (err, phi) => {
                console.log("HomeCOntroller processing ", err, phi);
                if (err) {
                    console.log(err);
                    return self.showToast(`Failure to load personal health information ${err}`);
                }
                self.model.participant.personalHealthInfo = phi; // undefined if there is none
                if (self._recheckPersonalHealthInformation()) {
                    console.log("Navigate to tab-healthinfo");
                    self._navigateToTab({ tab: "tab-healthinfo" });
                } else {
                    self.showToast(`Welcome back to Clinical Trials Recruitment Patient App ${self.model.participant.firstname}`);
                }
            });
        }, {capture: true});
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("HomeCOntroller processing "+EVENT_REFRESH);
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
        console.log("HomeCOntroller _navigateToTab", props);
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
