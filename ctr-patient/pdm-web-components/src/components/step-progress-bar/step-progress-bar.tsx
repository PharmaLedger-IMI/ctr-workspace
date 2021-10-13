import {Component, Host, h, Prop, State, Event, EventEmitter, Watch} from '@stencil/core';
import {HostElement} from "../../decorators";

@Component({
  tag: 'step-progress-bar',
  styleUrl: 'step-progress-bar.css',
  shadow: false,
})
export class StepProgressBar {

  private _activeNode: number = 1000;

  @HostElement() host: HTMLElement;

  @Prop({attribute: 'header'}) header: string = '';
  @Prop({attribute: 'clickable-node'}) clickableNode: boolean = false;
  @Prop({attribute: 'progress-steps'}) progressSteps: string = '[]';

  @Watch('progressSteps')
  watchProgressSteps(newValue: string) {
    this._progressSteps = []
    if (!!newValue) {
      try {
        this._progressSteps = JSON.parse(newValue);
      } catch (err) {
        if (!this.progressSteps) {
          console.log('# step-progress-bar err=', err)
        }
      }
    }
  }

  @State() _progressSteps: Array<Node> = [];

  @Event({
    eventName: 'ssapp-action',
    bubbles: true,
    composed: true,
    cancelable: true,
  })
  sendAction: EventEmitter;

  nodeClick(index: number) {
    const self = this;
    if (self.clickableNode) {
      self.sendAction.emit({
        action: 'step-progress-bar-click',
        data: !!self._progressSteps[index].data ? self._progressSteps[index].data : {},
        index,
      })
    }
  }

  buildHeader(header: string) {
    if (!header)
      return [];
    return [<ion-title className="ctrtitle">{header}</ion-title>, <hr/>];
  }

  buildStepNode(node: Node, index: number) {
    const self = this;
    let cssStep = '';
    let cssNode = '';
    if (!!node.active) {
      cssStep = 'in-progress';
      this._activeNode = index;
    } else if (index <= self._activeNode) { // fill path/progress until current node
      cssStep = 'in-progress complete';
      cssNode = self.clickableNode ? 'node-clickable' : '';
    }

    return (
      <div class={`step ${cssStep}`}>
        <span>{node.label}</span>
        <div class={`node ${cssNode}`} onClick={() => self.nodeClick(index)}>
          {!!node.text ? node.text : index + 1}
        </div>
      </div>
    )
  }

  render() {
    const self = this;
    if (!this.host.isConnected) return;

    return (
      <Host>
        <div class="wp-group">
          {...self.buildHeader(self.header)}
          <div class="wizard-progress">
            {...self._progressSteps.map((node, index) => {
              return self.buildStepNode(node, index)
            })}
          </div>
        </div>
      </Host>
    );
  }
}

interface Node {
  label: string;
  text?: string;
  active?: boolean;
  data?: any; // used to pass any logic or variable through click event
}
