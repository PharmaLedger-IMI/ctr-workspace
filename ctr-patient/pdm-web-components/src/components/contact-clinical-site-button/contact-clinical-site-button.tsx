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
  @Prop({attribute: 'clinical-sites'}) clinicalSites: string;
  @Prop({attribute: 'popup-options'}) popupOptions: string;
  @Prop({attribute: 'disabled-contact'}) disabledContact: boolean = false;

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

  @Watch('clinicalSites')
  watchClinicalSites(newValue) {
    try {
      this._clinicalSites = JSON.parse(newValue);
    } catch (e) {
      if (!!newValue)
        console.log('contact-clinical-site-button.clinicalSites newValue=', newValue, 'error=', e);
    }
  }

  @State() _clinicalSites: ClinicalSites;

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

  async showPopup(patientIdentity: PatientIdentity, popupOptions: PopupOptions, clinicalSites: ClinicalSites) {
    const alert: any = document.createElement('ion-alert');
    alert.cssClass = popupOptions.cssClass;
    alert.header = popupOptions.header;
    alert.message = popupOptions.message +
      '<div>' +
      '<br><strong>Name:</strong> '+patientIdentity.name +
      '<br><strong>Email:</strong> '+patientIdentity.email +
      '</div>';
    alert.buttons = [
      {text: popupOptions.cancelButtonLabel, role: 'cancel'},
      {
        text: popupOptions.authorizeButtonLabel,
        role: 'confirm',
        handler: (popupInputData) => {
          console.log('contact-clinical-site-button confirm=', popupInputData);
          this.authorizeClinicalSiteContact.emit(popupInputData)
        }
      }
    ];
    alert.inputs = clinicalSites.map((cs) => {
      return {
        name: 'cs',
        label: cs.name,
        value: cs.id, 
        type: 'radio'
      };
    });
    console.log("inputs", alert.inputs);
    document.body.appendChild(alert);
    await alert.present();
  }

  render() {
    if (!this.host.isConnected || !this._patientIdentity)
      return;

    const self = this;
    return (
      <Host>
        <ion-button color="light-blue"
                    disabled={this.disabledContact}
                    onClick={() => self.showPopup(self._patientIdentity, self._popupOptions, self._clinicalSites)}
        >
          {this.buttonLabel}
        </ion-button>
      </Host>
    );
  }

}
interface ClinicalSite {
  id: string;
  name: string;
}

interface ClinicalSites extends Array<ClinicalSite>{};

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
