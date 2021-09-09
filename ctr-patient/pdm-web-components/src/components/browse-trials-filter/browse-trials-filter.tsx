import {Component, Event, Host, h, Prop, EventEmitter} from '@stencil/core';

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

  private onChange(filterName, evt) {
    const {detail} = evt;
    if (detail.value === 'ignore') {
      if (this.formControl.hasOwnProperty(filterName))
        delete this.formControl[filterName]
    } else
      this.formControl[filterName] = detail.value;
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

    return (
      <ion-item>
        <ion-label position="stacked">{input.label}</ion-label>
        <ion-select interface="popover" placeholder="-" onIonChange={this.onChange.bind(self, input.filterName)}>
          <ion-select-option value="ignore">-</ion-select-option>
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
        <ion-col size="2" className="browse-trials-input">
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
}

interface BrowseTrialsSelectOption {
  label: string;
  value: string;
}
