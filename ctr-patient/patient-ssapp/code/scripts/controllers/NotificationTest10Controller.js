import { EVENT_NAVIGATE_TAB, EVENT_REFRESH, LocalizedController } from "../../assets/pdm-web-components/index.esm.js";

/**
 * Answer a pre-screener for one specific trial - General Health Information 
 */
export default class NotificationTest10Controller extends LocalizedController {
    
    initializeModel = () => ({
        duration: 0,
        status: 'Nothing attempted yet!'
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
            this.model.status = "Checking browser support for notifications!";
            if (!('Notification' in window)) {
                const err = "This browser appears not to support notifications!";
                this.model.status = err;
                return self.showErrorToast(err);
            }
            this.model.status = "Executing Notification.requestPermission()";
            if (self.checkNotificationPromise()) {
                // modern promise-based API
                Notification.requestPermission().then((result) => {
                    this.model.status = "Checking permission for notification "+result;
                    console.log("result", result);
                    if (result === 'granted') {
                        console.log("Granted");
                        setTimeout(function () {self.showNotification();}, 5000);
                    }
                });
            } else {
                // old callback API
                Notification.requestPermission((result) => {
                    this.model.status = "Checking permission for notification "+result;
                    console.log("result", result);
                    if (result === 'granted') {
                        console.log("Granted");
                        setTimeout(function () {self.showNotification();}, 5000);
                    }
                });
            }
        });
        
        self.on("ionChange", (evt) => {
            console.log("NotificationTest10Controller ionChange ", evt);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            if (evt.type=="ionChange") // && evt.target.id="not10Range"
                this.model.duration = evt.detail.value;
        }, {capture: true});
    
    }
    
    showNotification() {
        this.model.status = "Going to emit notification";
        const notifTitle = "Title of Notification";
        const notifBody = `There is a new trial for drug <b>XXX</b>! <p>Click to contact!<p> <br> The end!`;
        const notifImg = `/assets/mah/pfizer/logo_h165px.png`;
        const options = {
            body: notifBody,
            icon: notifImg,
        };
        new Notification(notifTitle, options);
        this.model.status = "Emitted notification";
    }

    /**
     * Detect if browser supports promises.
     * See https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API#feature-detecting_the_requestpermission_promise
     * @returns true
     */
    checkNotificationPromise() {
        try {
            Notification.requestPermission().then();
        } catch (e) {
            return false;
        }
        return true;
    }
    
}