import {Component, Host, h, Element, Prop, Watch, State} from '@stencil/core';
import {HostElement} from "../../decorators";
// import {ValidationService} from '../../services/ValidationService'

// const {Registry, INPUT_FIELD_PREFIX} = ValidationService;

const ERROR_CSS_CLASS = "form-input-invalid";

@Component({
  tag: 'form-input',
  styleUrl: 'form-input.css',
  shadow: false,
})
export class FormInput {

  @HostElement() host: HTMLElement;

  @Element() element;

  @Prop({attribute: 'input', mutable: true}) input = undefined;

  @Prop({attribute: 'lines'}) lines: 'none' | 'inset' | 'full' | undefined = 'inset'
  @Prop({attribute: 'label-position'}) labelPosition: "fixed" | "floating" | "stacked" | undefined = 'floating';
  @Prop({attribute: 'class-string'}) cssClassString: string | string[] = '';
  // @Prop({attribute: 'enable-custom-validation'}) customValidation: boolean = false;

  @State() hasErrors: boolean = false;

  private baseEl: HTMLFormElement = undefined;

  async componentWillLoad() {
    if (!this.host.isConnected)
      return;
  }

  async componentDidRender() {
    this.baseEl = this.element.querySelector(`input[name="${this.getInputName()}"]`);
    if (this.baseEl)
      this.bindInput(this.baseEl);
  }

  private bindInput(element) {
    const self = this;
    element.oninvalid = self.onInvalid.bind(self);
    element.onvalid = (e) => console.log('VALID:', e);
  }

  @Watch("input")
  update(newVal) {
    console.log(newVal);
  }

  private onChange(evt) {
    this.input.props.value = evt.detail.value;
    //this.performValidations(evt.target.querySelector('input'), false);
  }

  private onInput(evt) {
    console.log("input", evt);
    this.hasErrors = false;
    this.baseEl.setCustomValidity('');
  }

  private onInvalid(evt) {
    console.log("INPUT INVALID", evt);
    // this.performValidations(this.baseEl, false);
  }

  private isReady() {
    return this.input && this.input.name;
  }

  private getInputName() {
    return `${this.input.name}`;
  }

  private renderInput() {
    const self = this;

    const getLabel = function () {
      if (!self.isReady())
        return (<ion-skeleton-text style={{"width": "60%"}} animated></ion-skeleton-text>);
      return self.input.label;
    }

    const getInput = function () {
      if (!self.isReady())
        return (<ion-skeleton-text style={{"width": "85%"}} animated></ion-skeleton-text>);
      const Tag = self.input.element;
      return (
        <Tag
          name={self.getInputName()} {...self.input.props}
          onIonChange={self.onChange.bind(self)}
          onIonInput={self.onInput.bind(self)}
        > </Tag>
      )
    }

    return [
      <ion-label position={this.labelPosition}>
        {getLabel()}
      </ion-label>,
      getInput()
    ]
  }

  private renderClassString() {
    return (typeof this.cssClassString === 'string' ? this.cssClassString : this.cssClassString.join(' ')) +
    this.hasErrors ? ` ${ERROR_CSS_CLASS}` : '';
  }

  render() {
    if (!this.host.isConnected)
      return;
    return (
      <Host>
        <ion-item lines={this.lines} class={this.renderClassString()}>
          {...this.renderInput()}
        </ion-item>
      </Host>
    );
  }
}
