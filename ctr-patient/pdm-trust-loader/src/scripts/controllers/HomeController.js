/**
 * @module controllers
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
        self.model.formJSON = JSON.stringify(self.model.form.login);
        this.loaderService = new LoaderService(env);

        self.on('click', async (evt) => {
            const {id} = evt.target;
            if (id === 'loginView') {
                self.model.formJSON = JSON.stringify(self.model.form.login);
            }
            if (id === 'signUpView') {
                self.model.formJSON = JSON.stringify(self.model.form.register);
            }
        });

        self.on('ssapp-action', async (evt) => {
            evt.preventDefault();
            evt.stopImmediatePropagation();

            const {action, form} = evt.detail;
            const credentialsForm = action === 'login' ? self.model.form.login : self.model.form.register;

            const credentials = Object.keys(form).reduce((accum, name) => {
                if (name !== 'terms-and-conditions') {
                    const isPublic = credentialsForm.fields.find(f => f.name === name).public;
                    accum[name] = {secret: form[name], public: isPublic};
                }
                return accum;
            }, {});

            const method = action === 'login' ? self.login : self.register;
            await method.call(self, credentials, (err, result) => {
                if (err) {
                    return console.log(`${action} action failed`);
                }
                console.log(`${action} action successful. output: ${result}`);
                if (method !== 'login') {
                    setTimeout(() => {
                        self.model.formJSON = JSON.stringify(self.model.form.login);
                        }, 1000
                    );
                }
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
    }

    /**
     * Loads the SSApp
     * @param {object} credentials
     * @param {function} callback
     */
    async login(credentials, callback){
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
}