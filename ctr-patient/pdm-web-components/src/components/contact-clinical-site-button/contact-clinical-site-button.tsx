import {Component, Host, h, Event, EventEmitter, Prop, Watch, State} from '@stencil/core';
import {HostElement} from "../../decorators";

@Component({
  tag: 'contact-clinical-site-button',
  styleUrl: 'contact-clinical-site-button.css',
  shadow: false,
})
export class ContactClinicalSiteButton {

  @HostElement() host: HTMLElement;

  @Prop({attribute: 'button-label'}) buttonLabel: string = 'Contact Clinical Site';
  @Prop({attribute: 'patient-identity'}) patientIdentity: string;
  @Prop({attribute: 'popup-options'}) popupOptions: string;

  @Watch('patientIdentity')
  watchPatientIdentity(newValue) {
    try {
      const {name, email} = JSON.parse(newValue);
      this._patientIdentity = {name, email};
    } catch (e) {
      if (!!newValue)
        console.log('contact-clinical-site-button.patientIdentity newValue=', newValue, 'error=', e);
    }
  }

  @State() _patientIdentity: PatientIdentity;

  @Watch('popupOptions')
  watchPopupOptions(newValue) {
    try {
      const newOptions = JSON.parse(newValue);
      this._popupOptions = Object.assign(this._popupOptions, newOptions);
    } catch (e) {
      console.log('contact-clinical-site-button.popupOptions newValue=', newValue, 'error=', e);
    }
  }

  @State() _popupOptions: PopupOptions = {
    header: 'Clinical Site Contact Authorization',
    message: 'I <strong>authorise</strong> the clinical site to use this data <i>(along with my pre-screener answers)</i> for trial contact purposes.',
    authorizeButtonLabel: "Authorize",
    cancelButtonLabel: "Cancel",
    cssClass: 'contact-clinical-site-alert'
  }

  @Event({
    eventName: 'ssapp-authorize-clinical-site-contact',
    bubbles: true,
    composed: true,
    cancelable: true,
  }) authorizeClinicalSiteContact: EventEmitter;

  async showPopup(patientIdentity: PatientIdentity, popupOptions: PopupOptions) {
    const alert: any = document.createElement('ion-alert');
    alert.cssClass = popupOptions.cssClass;
    alert.header = popupOptions.header;
    alert.message = popupOptions.message;
    alert.buttons = [
      {text: popupOptions.cancelButtonLabel, role: 'cancel'},
      {
        text: popupOptions.authorizeButtonLabel,
        role: 'confirm',
        handler: (popupInputData) => {
          console.log('contact-clinical-site-button confirm=', popupInputData);
          this.authorizeClinicalSiteContact.emit({...popupInputData})
        }
      }
    ];
    alert.inputs = [
      {name: 'name', value: patientIdentity.name, disabled: true},
      {name: 'email', value: patientIdentity.email, disabled: true},
    ];
    document.body.appendChild(alert);
    await alert.present();
  }

  render() {
    if (!this.host.isConnected || !this._patientIdentity)
      return;

    const self = this;
    return (
      <Host>
        <ion-button color="light-blue" onClick={() => self.showPopup(self._patientIdentity, self._popupOptions)}>
          {this.buttonLabel}
        </ion-button>
      </Host>
    );
  }

}

interface PatientIdentity {
  name: string;
  email: string;
}

interface PopupOptions {
  header: string;
  message: string;
  cancelButtonLabel: string;
  authorizeButtonLabel: string;
  cssClass: string;
}
