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
  @Prop({attribute: 'clinical-site'}) clinicalSite: string;
  @Prop({attribute: 'popup-options'}) popupOptions: string;
  @Prop({attribute: 'disabled-contact'}) disabledContact: boolean = false;

  @Watch('patientIdentity')
  watchPatientIdentity(newValue) {
    try {
      const {name, email} = JSON.parse(newValue);
      this._patientIdentity = {name, email};
    } catch (e) {
      if (!!newValue && !newValue.startsWith("@patient"))
        console.log('contact-clinical-site-button.patientIdentity newValue=', newValue, 'error=', e);
    }
  }

  @State() _patientIdentity: PatientIdentity;

  @Watch('clinicalSite')
  watchClinicalSite(newValue) {
    try {
      console.log("Parsing ",newValue);
      this._clinicalSite = JSON.parse(newValue);
    } catch (e) {
      if (!!newValue && !newValue.startsWith("@clinical"))
        console.log('contact-clinical-site-button.clinicalSite newValue=', newValue, 'error=', e);
    }
  }

  @State() _clinicalSite: ClinicalSite;

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


  escapeHtml(str) {
    const tagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    };
    const replaceTag = (tag) => {
      return tagsToReplace[tag] || tag;
    };
    return str.replace(/[&<>]/g, replaceTag);
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePhone(phone) {
    if (!phone)
      return true; // phone is optional
    const re = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,11}[-\s\.]?[0-9]{1,11}(.*)?$/im;
    return re.test(String(phone));
  }

  async showPopup(patientIdentity: PatientIdentity, popupOptions: PopupOptions, clinicalSite: ClinicalSite) {
    const self = this;
    const alert: any = document.createElement('ion-alert');
    alert.cssClass = popupOptions.cssClass;
    alert.header = popupOptions.header;
    alert.message = popupOptions.message;
    alert.message = 'I <strong>authorise</strong> '+this.escapeHtml(clinicalSite.name)+' to use this data <i>(along with my pre-screener answers)</i> for trial contact purposes.',

    alert.buttons = [
      {text: popupOptions.cancelButtonLabel, role: 'cancel'},
      {
        text: popupOptions.authorizeButtonLabel,
        role: 'confirm',
        handler: (popupInputData) => {
          console.log('contact-clinical-site-button confirm=', popupInputData);
          if (!popupInputData
            || !popupInputData.name
            || !popupInputData.email
            || !this.validateEmail(popupInputData.email)
            || !this.validatePhone(popupInputData.phone)
          ) {
            console.log("Cannot authorize empty name or invalid email address or invalid phone number!");
            return false; // ion-alert is not dismissed.
          }
          const eventDetail = {...popupInputData};
          eventDetail.clinicalSiteId = clinicalSite.id;
          eventDetail.clinicalSiteName = clinicalSite.name;
          this.authorizeClinicalSiteContact.emit(eventDetail);
          return true;
        }
      }
    ];
    alert.inputs = [
      {name: 'name', value: patientIdentity.name, disabled: false},
      {name: 'email', value: patientIdentity.email, disabled: false},
      {name: 'phone', value: '', disabled: false, placeholder: '+NNN-NNNNNNNNN (phone)'},
    ];
    //console.log("inputs", alert.inputs);
    document.body.appendChild(alert);
    await alert.present();
  }

  componentWillLoad() {
    this.watchPatientIdentity(this.patientIdentity);
    this.watchClinicalSite(this.clinicalSite);
  }

  render() {
    //console.log("Rendering ", this.disabledContact);

    if (!this.host.isConnected || !this._patientIdentity)
      return;

    const self = this;
    return (
      <Host>
        <ion-button color="light-blue"
                    disabled={this.disabledContact}
                    onClick={() => self.showPopup(self._patientIdentity, self._popupOptions, self._clinicalSite)}
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
