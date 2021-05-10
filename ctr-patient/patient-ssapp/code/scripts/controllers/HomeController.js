import { HomeController as BaseHomeController, EVENT_SSAPP_HAS_LOADED } from "../../assets/pdm-web-components/index.esm.js";

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
        self.on(EVENT_SSAPP_HAS_LOADED, (evt) => {
            this.participantManager.readPersonalHealthInfo( (err, phi) => {
                if (err) {
                    console.log(err);
                    return self.showToast(`Failure to load personal health information ${err}`);
                }
                this.participant.personalHealthInfo = phi;
                this.model.hasPersonalHealthInfo = phi; // shortcut used in home.html
                if (self.model.participant)
                    self.showToast(`Welcome back to Clinical Trials Recruitment Patient App ${self.model.participant.name}`);
            });
        }, {capture: true});
    }
}