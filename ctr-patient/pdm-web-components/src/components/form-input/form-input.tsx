import {Component, Host, h, Element, Prop, State, Event, EventEmitter} from '@stencil/core';
import {HostElement} from "../../decorators";

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

  @State() hasErrors: boolean = false;

  @State() value = '';

  @Event({
    eventName: 'form-input-change',
    bubbles: true,
    composed: true,
    cancelable: true,
  }) inputChange: EventEmitter;

  private baseEl: HTMLFormElement = undefined;

  async componentWillLoad() {
    if (!this.host.isConnected)
      return;
  }

  private getInputName() {
    return `${this.input.name}`;
  }

  private bindInput(element) {
    const self = this;
    element.oninvalid = self.onInvalid.bind(self);
    element.onvalid = (e) => console.log('VALID:', e);
  }

  async componentDidRender() {
    this.baseEl = this.element.querySelector(`input[name="${this.getInputName()}"]`);
    if (this.baseEl) {
      this.bindInput(this.baseEl);
    }
  }

  private onChange(evt) {
    if (this.input.element != 'ion-checkbox') {
      this.input.props.value = evt.detail.value;
    } else {
      this.input.props.value = evt.detail.checked;
    }
    this.value = this.input.props.value;
    this.inputChange.emit({
      inputName: this.input.name,
      type: this.input.type || this.input.element,
      ...evt.detail
    });
  }

  private onInput(evt) {
    console.log("input", evt);
    this.hasErrors = false;
  }

  private onInvalid(evt) {
    console.log("form-input-INVALID=", this.input, ' evt=', evt);
  }

  private renderInput() {
    const self = this;

    const getInput = function () {
      const Tag = self.input.element;
      return (
        <Tag
          name={self.input.name}
          {...self.input.props}
          onIonChange={self.onChange.bind(self)}
          onIonInput={self.onInput.bind(self)}
        > </Tag>
      )
    }

    const getLabel = (props: any) => {
      const prefix = self.input.labelPrefix ? self.input.labelPrefix : '';
      if (self.input.href) {
        return (<ion-label {...props}>{prefix}<a href={self.input.href.url}
                                                 target={self.input.href.target}>{self.input.label}</a></ion-label>)
      }
      return (<ion-label {...props}>{prefix}{self.input.label}</ion-label>)
    }

    const props = self.input.element === 'ion-checkbox' ? {} : {position: this.labelPosition};
    if (self.input.labelFirst === false) {
      return [getInput(), getLabel(props)]
    }
    return [getLabel(props), getInput()]
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
