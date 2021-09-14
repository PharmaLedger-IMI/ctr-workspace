import {Component, Event, Host, h, Prop, EventEmitter} from '@stencil/core';

@Component({
  tag: 'browse-trials-filter',
  styleUrl: 'browse-trials-filter.css',
  shadow: false,
})
export class BrowseTrialsFilter {

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

  private onChange(filterName: string, evt: any) {
    const {detail} = evt;
    const data = {
      filterName,
      label: detail.value.label,
      value: detail.value.value
    }
    console.log('browse-trials-filter.onChange filterName=', filterName, ' evt=', data);
    this.changeSelectedOption.emit(data)
  }

  private handleButtonClick(evt: any) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    this.clickFilterButton.emit();
  }

  private buildBrowseTrialsInput(input: BrowseTrialsInput) {
    const self = this;
    const buildSelectOptions = (optionsArray) => {
      return optionsArray.map((selectOption) => {
        return (<ion-select-option value={selectOption}>{selectOption.label}</ion-select-option>)
      })
    }

    return (
      <ion-item>
        <ion-label position="stacked">{input.label}</ion-label>
        <ion-select
          value={input.defaultValueIndex ? input.options[input.defaultValueIndex] : undefined}
          interface="popover"
          placeholder="-"
          onIonChange={this.onChange.bind(self, input.filterName)}
        >
          {...buildSelectOptions(input.options)}
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

    const buildInputCols = (inputs) => inputs.map((input) => {
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
            {...buildInputCols(browseTrialsInputParse)}
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
  defaultValueIndex?: number;
}

interface BrowseTrialsSelectOption {
  label: string;
  value: string;
}
