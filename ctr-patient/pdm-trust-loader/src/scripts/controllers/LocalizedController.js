/**
 * @module controllers
 */

/**
 *
 */
const { WebcController } = WebCardinal.controllers;

/**
 * Master Controller to provide access to the Localization features provided by WebCardinal.
 *
 * Also provides integration with WebCardinal config api eg: {@link setIdentity}
 *
 * All child classes must perform the following on their constructor:
 * <pre code=javascript>
 *      constructor(element, history){
 *          super(element, history);
 *          super.bindLocale(this, pageName);
 *          this.setModel(this.initializeModel());
 *      }
 * </pre>
 * @class LocalizedController
 */
export default class LocalizedController extends WebcController {
    initializeModel = () => {
        throw new Error("Child classes must implement this");
    }

    /**
      * Shows an Ionic model
     * @param {string} modalName the modal's name registered via:
     * <pre>
     *     customElements.define('registration-modal', class extends HTMLElement{
     *          connectedCallback(){
     *              this.innerHTML = `
     *                  <ion-header class="ion-padding">
     *                      <ion-title>Title</ion-title>
     *                      <ion-content>
     *                          Content
     *                      </ion-content>
     *                  </ion-header>`
     *              }
     *          });
     * </pre>
     * @param {boolean} [swipeToClose]: enables slideToClose when available. defaults to false
     * @param {object} [params]: passes param to modal (ionic functionality)
     * @deprecated
     */
    showIonicModal(modalName, swipeToClose, params){
        if (typeof swipeToClose === 'object'){
            params = swipeToClose;
            swipeToClose = false;
        }
        swipeToClose = !!swipeToClose;
        this.modal = this.createAndAddElement('ion-modal',{
            id: `Id${modalName}`,
            component: modalName,
            backdropDismiss: false,
            swipeToClose: swipeToClose,
            componentProps: params
        });
        this.modal.present();
    }

    /**
     * @deprecated
     */
    closeIonicModal(){
        if (this.modal)
            this.modal.dismiss();
    }

    /**
     * Shows a Toast via {@link showToast} with
     *  - header: 'Error'
     *  - cssClass: 'danger
     *  - button: 'Close'
     * @param {string} message
     */
    showErrorToast(message){
        return this.showToast(message, 'Error', 'danger', 'Close');
    }

    /**
     *
     * @param {string} msg
     * @param {err} err
     * @param {function(*)}callback
     * @protected
     */
    _err(msg, err, callback){
        OpenDSUSafeCallback(callback)(createOpenDSUErrorWrapper(msg, err));
    }

    showAlert(message, options){
        options = Object.assign( {
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Ok',
                    role: 'confirm'
                }
            ]
        }, options || {});

        console.log('## LocalizedController message=', message);
        const alert = document.createElement('ion-alert');
        alert.cssClass = options.cssClass || CSS.ALERT;
        alert.header = options.header;
        alert.subHeader = options.subHeader;
        alert.message = message;
        alert.animated = options.animated !== false;
        alert.backDropDismiss = options.backDropDismiss !== false;
        alert.buttons = options.buttons;
        alert.inputs = options.inputs;

        document.body.appendChild(alert);
        alert.present();
        return alert;
    }

    showPopup(popupOptions, callback = undefined) {
        let { message, confirmButtonLabel, cancelButtonLabel, options } = popupOptions;
        console.log('## LocalizedController showPopup.message=', message);
        const buttons = [{
            text: cancelButtonLabel || 'Cancel',
            role: 'cancel',
        },
            {
                text: confirmButtonLabel || 'Ok',
                role: 'confirm',
                handler: evt => {
                    if (!!callback) callback(evt);
                }
            }];
        options = Object.assign({buttons}, options || {});
        return this.showAlert(message, options);
    }

    /**
     * Shows Toast Alert
     *
     * @param {string} message
     * @param {string} [header] if given will be presenter in the header
     * @param {string|string[]} [cssClass]
     * @param {string} button the text on the close button
     * @param {function()} buttonHandler
     */
    showToast(message, header, cssClass, button, buttonHandler){
        const toast = this.createAndAddElement('ion-toast');
        toast.header = header;
        toast.message = message;
        toast.position = 'bottom';
        toast.duration = 2000;
        if (cssClass)
            toast.cssClass = cssClass;
        if (button)
            toast.buttons = [
                {
                    text: button,
                    role: 'cancel',
                    handler: buttonHandler ? buttonHandler : () => {
                        console.log('Cancel clicked');
                    }
                }
            ];

        return toast.present();
    }

    /**
     * Adds the locale info to the model.
     * @param {LocalizedController} controller
     * @param {string} [pageName]
     * @param {boolean} [enableValidations] defaults to false. If provided enabled Ionic Inputs form validations
     */
    bindLocale(controller, pageName, enableValidations){
        require('toolkit').Services.WebcLocaleService.bindToLocale(controller, pageName);
        if (enableValidations)
            require('toolkit').Model.Validations.bindIonicValidation(controller);
    }

    constructor(element, history) {
        super(element, history);
    }
}
