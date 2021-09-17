/**
 * @module controllers
 */

/**
 *
 */
import env from "../../environment.js"
import LocalizedController from './LocalizedController.js'
import LoaderService from "../services/LoaderService.js";

/**
 * @class HomeController
 */
export default class HomeController extends LocalizedController {
    initializeModel = () => ({
        participant: undefined,
        formJSON: '{}'
    });

    constructor(element, history) {
        super(element, history);
        super.bindLocale(this);
        this.model = this.initializeModel();

        let self = this;
        self.model.formJSON = JSON.stringify(self.model.form);
        this.loaderService = new LoaderService(env);
        console.log('## self.model.formJSON=', self.model.formJSON);

        self.on('ssapp-action', async (evt) => {
            evt.preventDefault();
            evt.stopImmediatePropagation();

            const {action, form, frame} = evt.detail;
            console.log('## HomeController frame=', frame);

            const credentials = Object.keys(form).reduce((accum, name) => {
                const isPublic = self.model.form.fields.find(f => f.name === name).public;
                accum[name] = {secret: form[name], public: isPublic}
                return accum;
            }, {});

            const method = action === 'login' ? self.login : self.register;
            await method.call(self, credentials, (err, result) => {
                if (err) {
                    return console.log(`${action} action failed`);
                }
                console.log(`${action} action successful. output: ${result}`);
            });
        }, true);

        console.log("Home controller initialized");
    }

    /**
     * Instantiates a new Spinner
     * @param {string} message
     * @param {number} duration
     * @return {ion-loading} a spinner
     * @private
     */
    _getLoader(message, duration){
        duration = duration || 0;
        const loading = document.createElement('ion-loading');
        loading.cssClass = 'ion-loading';
        loading.message = message;
        loading.translucent = true;
        loading.duration = duration;
        document.body.appendChild(loading);
        return loading;
    }

    /**
     * Creates the ID DSU and mounts it to the id_path
     * @param {object} credentials
     * @param {function} callback
     */
    async register(credentials, callback) {
        let self = this;
        // this._showLoginModal();
        const popupAcceptButtonCallback = (async () => {
            let loader = self._getLoader("Registering...");
            await loader.present();

            self.loaderService.create(credentials, async (err, keySSI) => {
                if (err) {
                    self.showErrorToast(self.translate('errors.register'));
                } else {
                    self.showToast(self.translate('success.register'));
                }
                await loader.dismiss();
                callback(undefined, keySSI);
            });
        });

        this._showPopup('add terms...', {
            cssClass: 'my-custom-alert',
        }, popupAcceptButtonCallback);
    }

    /**
     * Loads the SSApp
     * @param {object} credentials
     * @param {function} callback
     */
    async login(credentials, callback) {
        let self = this;
        let loader = this._getLoader("Logging in...");
        this.loaderService.load(credentials, loader, async (err, wallet) => {
           if (err){
               self.showErrorToast(err);
               return callback(err);
           }
           self.showToast(self.translate('success.login'));
           callback(undefined, wallet);
        });
    }

    _showPopup(message = 'create.confirm', popupOptions, callback) {
        // <iframe src="assets/images/PL-CTR-Terms-of-Use.pdf" width="100" height="780" style="border: none;"></iframe>
        return super.showPopup({
            message: 'add terms & conditions...',
            // message: '<div><strong>NOTE: This is not the actual Terms of Use. This is just placeholder copy.</strong></div>' +
            //     '<ion-row><strong>Clinical Trial Recruitment Application – Terms of Use</strong></ion-row>',
            confirmButtonLabel: 'Accept & Continue',
            cancelButtonLabel: 'Cancel',
            options: popupOptions
        }, callback);
    }
}