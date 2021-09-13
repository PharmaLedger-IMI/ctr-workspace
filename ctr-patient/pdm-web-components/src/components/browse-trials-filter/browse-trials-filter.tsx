import {Component, Event, Host, h, Prop, EventEmitter, Method} from '@stencil/core';

@Component({
  tag: 'browse-trials-filter',
  styleUrl: 'browse-trials-filter.css',
  shadow: false,
})
export class BrowseTrialsFilter {

  private formControl = {}

  @Prop({attribute: 'submit-button-label'}) submitButtonLabel: string = 'Search';
  @Prop({attribute: 'filter-inputs'}) filterInputs: string;

  @Event({
    eventName: 'submit-browse-trials-filter',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) clickFilterButton: EventEmitter;

  @Event({
    eventName: 'change-browse-trials-filter',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) changeSelectedOption: EventEmitter;

  @Method()
  async showPrompt() {
    // show a prompt
  }

  private onChange(filterName, evt) {
    const {detail} = evt;
    this.changeSelectedOption.emit({
      filterName,
      value: detail.value
    })
  }

  private handleButtonClick(evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    this.clickFilterButton.emit(this.formControl);
  }

  private buildBrowseTrialsInput(input: BrowseTrialsInput) {
    const self = this;
    const selectOptions = input.options.map((selectOption) => {
      return (<ion-select-option value={selectOption.value}>{selectOption.label}</ion-select-option>)
    })

    // onChange will not be called if there are no clicks on the control
    if (input.defaultValue)
      this.formControl[input.filterName] = input.defaultValue;

    return (
      <ion-item>
        <ion-label position="stacked">{input.label}</ion-label>
        <ion-select
          value={input.defaultValue ? input.defaultValue : undefined}
          interface="popover"
          placeholder="-"
          onIonChange={this.onChange.bind(self, input.filterName)}
        >
          {...selectOptions}
        </ion-select>
      </ion-item>
    );
  }

  render() {
    const self = this;
    let browseTrialsInputParse: BrowseTrialsInput[];
    try {
      browseTrialsInputParse = JSON.parse(this.filterInputs);
    } catch (e) {
      return;
    }

    const buildInputCols = browseTrialsInputParse.map((input) => {
      return (
        <ion-col size-lg="2" size-md="4" size-sm="12" className="browse-trials-input">
          <div>{self.buildBrowseTrialsInput(input)}</div>
        </ion-col>
      )
    })

    return (
      <Host>
        <ion-grid>
          <ion-row class="ion-align-items-center">
            {...buildInputCols}
            <ion-button color="light-blue" size="large" onClick={self.handleButtonClick.bind(this)}>
              {this.submitButtonLabel}
            </ion-button>
          </ion-row>
        </ion-grid>
      </Host>
    );
  }
}

interface BrowseTrialsInput {
  label: string;
  filterName: string;
  options: BrowseTrialsSelectOption[]
  defaultValue: string;
}

interface BrowseTrialsSelectOption {
  label: string;
  value: string;
}
