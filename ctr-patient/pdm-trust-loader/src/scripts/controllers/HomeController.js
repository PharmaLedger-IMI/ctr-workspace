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
        // see src/pages/home.translate.json for a definition of the form fields

        let self = this;
        const lastUser = self.getLastUser();
        if (lastUser) {
            console.log("login form for", lastUser);
            self.model.formJSON = JSON.stringify(lastUser);
        } else {
            console.log("register form", self.model.form.register);
            self.model.formJSON = JSON.stringify(self.model.form.register);
        }
        this.loaderService = new LoaderService(env);

        self.on('click', async (evt) => {
            const {id} = evt.target;
            if (id === 'loginView') {
                const lastUser = self.getLastUser();
                self.model.formJSON = JSON.stringify(lastUser ? lastUser : self.model.form.login);
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
                if (name !== 'terms-and-conditions' && name !== 'password-repeat') { // remove these fields from credentials
                    const isPublic = credentialsForm.fields.find(f => f.name === name).public;
                    accum[name] = {secret: form[name], public: isPublic};
                }
                return accum;
            }, {});

            console.log("credentials", credentials);
            const method = action === 'login' ? self.login : self.register;
            await method.call(self, credentials, (err, result) => {
                if (err) {
                    return console.log(`${action} action failed`);
                }
                console.log(`${action} action successful. output: ${result}`);
            });
        }, true);

        console.log("Home controller initialized", lastUser);
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
                setTimeout(() => {
                    const lastUser = self.storeCredentialsAsLastUser(credentials);
                    self.model.formJSON = JSON.stringify(lastUser);
                }, 1300);
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
        await loader.present();
        this.loaderService.load(credentials, loader, async (err, wallet) => {
            if (err){
                self.showErrorToast(err);
                await loader.dismiss();
                return callback(err);
            }
            self.showToast(self.translate('success.login'));
            self.storeCredentialsAsLastUser(credentials);
            callback(undefined, wallet);
        });
    }

    /**
     * Copy credentials into login fields, and store as lastUser.
     * @param {*} credentials 
     * @returns an object that can be used as a login form.
     */
    storeCredentialsAsLastUser(credentials) {
        const self = this;
        Object.keys(credentials).forEach((key) => {
            self.model.form.login.fields.forEach((field) => {
                if (field.name === key) {
                    if (key === "password") {
                        // store password as blank (forcing the user to input the password the next time)
                        field.props.value = "";                        
                    } else {
                        field.props.value = credentials[key].secret;
                    }
                }
            });
        });
        const lastUser = self.model.form.login;
        self.setLastUser(lastUser);
        return lastUser;
    }

    /**
     * Returns the last login form for a signed up userd. See the register method above.
     * @returns undefined if never used. The JSON.parse of the form object data if already used.
     */
    getLastUser() {
        const lastUserItem = localStorage.getItem("user");
        if (!lastUserItem)
            return lastUserItem;
        return JSON.parse(lastUserItem);
    }

    /**
     * Record the object for the last user that signed up properly.
     * @param {*} userObj An object that can be used as a login form.
     */
    setLastUser(userObj) {
        localStorage.setItem("user", JSON.stringify(userObj));
    }
}