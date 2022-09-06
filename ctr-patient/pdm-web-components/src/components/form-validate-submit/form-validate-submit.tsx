import {Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch} from '@stencil/core';
import {HostElement} from "../../decorators";

@Component({
  tag: 'form-validate-submit',
  styleUrl: 'form-validate-submit.css',
  shadow: false,
})
export class FormValidateSubmit {

  private checkboxController: { [key: string]: any } = {};
  private formEl: HTMLFormElement = undefined;

  @HostElement() host: HTMLElement;

  @Element() element;

  /**
   * Through this event action requests are made
   */
  @Event({
    eventName: 'ssapp-action',
    bubbles: true,
    composed: true,
    cancelable: true,
  })
  sendAction: EventEmitter;

  @Prop({attribute: 'form-json'}) formJSON: string = '{}';
  @Prop({attribute: 'lines'}) lines: 'none' | 'inset' | 'full' = 'inset';
  @Prop({attribute: 'label-position'}) labelPosition: "fixed" | "floating" | "stacked" = 'floating';

  @State() _disableSubmit: boolean = false;

  @State() form: {
    title: string,
    subTitle: string,
    prefix?: string,
    buttons: { label: string, props: any },
    fields: FormField[]
  } = undefined;

  @Watch('formJSON')
  async updateForm(newVal) {
    if (newVal.startsWith('@'))
      return;
    this.form = JSON.parse(newVal);
    this.handleCheckboxValidation();
  }

  @Listen('form-input-change')
  listenFormInputChange(evt: any) {
    const {inputName, type, checked} = evt.detail;
    if (type.indexOf('checkbox') >= 0) {
      this.checkboxController[inputName] = checked;
      this.handleDisableSubmit();
    }
  }

  @Method()
  async submit(name?: string) {
    const self = this;

    if (!name)
      name = this.element.querySelector('ion-button.primary-button').name;

    // get output values, even if invalid
    const output = {};
    this.form.fields.forEach(field => {
      output[field.name] = field.props.value;
    })

    // set or reset equaity validation
    this.form.fields.forEach(field => {
      // #95 honor equality validation. (The other validations seems to be done by the browser itself.)
      const otherFieldName = self.getEqualityOtherField(field);
      if (!otherFieldName)
        return;

      if (!output[otherFieldName]) {
        console.log(`Ignoring validation ${field.name} equality ${otherFieldName} because the later does not exist`);
        return;
      }
      const el = this.formEl.elements[field.name];
      if (!el) {
        console.log(`No input element for ${field.name}`);
        return;
      } else console.log("validating equality", el);
      if (field.props.value != output[otherFieldName]) {
        const errorMessage = field.validation.equality.error;
        el.setCustomValidity(errorMessage ? errorMessage : "No match!"); // https://stackoverflow.com/questions/5272433/html5-form-required-attribute-set-custom-validation-message
      } else {
        el.setCustomValidity(""); // example on https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation#Constraint_API%27s_element.setCustomValidity()
      }
    });

    if (!this.formEl.checkValidity())
      return this.formEl.reportValidity();

    console.log(`Form submitted. Result: `, output);
    this.sendAction.emit({
      action: name,
      form: output
    });
  }

  /**
   * If the field has a validation.equality constraint, get the other field's name.
   * @param field being checked if it has an equality validation.
   * @returns undefined if no equality validation, or a string with the other field name.
   */
  private getEqualityOtherField(field: FormField) : string {
    if (field.validation
      && field.validation.equality
      && Array.isArray(field.validation.equality.args)
      && field.validation.equality.args.length > 0
    ) {
      const otherFieldName = field.validation.equality.args[0];
      return otherFieldName;
    }
    return undefined;
  }

  private async onSubmit(evt, name?: string) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    await this.submit(name);
  }

  handleDisableSubmit() {
    this._disableSubmit = !Object.entries(this.checkboxController).every((value) => {
      return value[1];
    })
  }

  private buildFormInputs(fields: FormField[]) {
    return fields.map(field => {
      return (
        <form-input
          input={field}
          prefix={this.form.prefix}
          lines={this.lines}
          label-position={this.labelPosition}
        />
      )
    });
  }

  buildButton(button: any) {
    return (<ion-button {...button.props} disabled={this._disableSubmit}>{button.label}</ion-button>)
  }

  buildHeader(title: string, subTitle: string) {
    return (
      <div class="ion-text-center ion-padding-vertical">
        <div class="ion-text-center ion-padding-top flex flex-col">
          <h3>{title}</h3>
          <h6>{subTitle}</h6>
        </div>
      </div>
    )
  }

  handleCheckboxValidation() {
    const self = this;
    const _checkboxController = {};
    const availableFields = self.form.fields.map((field) => {
      return field.name
    });
    self.form.fields.map(field => {
      const {name} = field;
      const {required} = field.props;
      if (availableFields.indexOf(name)) {
        if ((field.element === 'ion-checkbox' || field.props.type === 'checkbox') && !!required) {
          _checkboxController[`${name}`] = self.checkboxController.hasOwnProperty(name) ? self.checkboxController[`${name}`] : false;
        }
      }
    })
    self.checkboxController = _checkboxController;
    this.handleDisableSubmit();
  }

  render() {
    if (!this.form)
      return (<div>component-form-validate-submit: Invalid form</div>);
    console.log('form-validate-submit.render() form=', this.form);

    return (
      <Host>
        <ion-card>

          <ion-card-header class="ion-margin ion-padding-horizontal">
            {this.buildHeader(this.form.title, this.form.subTitle)}
          </ion-card-header>

          <ion-card-content>
            <form id="form-validate-submit" onSubmit={this.onSubmit.bind(this)}>
              {...this.buildFormInputs(this.form.fields)}
              <div class="form-buttons ion-text-center ion-padding-vertical ion-margin-top">
                {this.buildButton(this.form.buttons)}
              </div>
            </form>
          </ion-card-content>

        </ion-card>
      </Host>
    );
  }

  async componentDidRender() {
    const self = this;
    this.formEl = this.element.querySelector('form');
    this.element.querySelectorAll('div.form-buttons ion-button').forEach(ionEl => {
      const button = ionEl.shadowRoot.querySelector('button')
      if (button.type === "submit")
        button.onclick = (evt) => self.onSubmit(evt, ionEl.getAttribute('name'));
    });
  }
}

interface FormField {
  name: string,
  element: string,
  label: string,
  props: {
    type?: string,
    value?: string,
    [key: string]: any
  },
  validation: any
}
