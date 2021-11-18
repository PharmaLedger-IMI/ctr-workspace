import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Answer a pre-screener for one specific trial - General Health Information 
 */
export default class NotificationTest10Controller extends LocalizedController {
    
    initializeModel = () => ({
        duration: 0
    }); // uninitialized blank model

    constructor(element, history) {
        super(element, history);
        const wizard = require('wizard');
        super.bindLocale(this, "notificationtest10");
        this.participantManager = wizard.Managers.getParticipantManager();
        this.matchManager = wizard.Managers.getMatchManager(this.participantManager);

        this.model = this.initializeModel();

        let self = this;
       
        self.on(EVENT_REFRESH, (evt) => {
            console.log("NotificationTest10Controller processing " + EVENT_REFRESH);
            evt.preventDefault();
            evt.stopImmediatePropagation();
        }, {capture: true});

        self.onTagClick('subscribe', (model, target, event) => {
            console.log("NotificationTest10Controller click subscribe", model, target, event);
            Notification.requestPermission().then((result) => {
                console.log("result", result);
                if (result === 'granted') {
                    console.log("Granted");
                }
            });
        });
        
        self.on("ionChange", (evt) => {
            console.log("NotificationTest10Controller ionChange ", evt);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            this.model.duration = evt.detail.value;
        }, {capture: true});
    
    }
}