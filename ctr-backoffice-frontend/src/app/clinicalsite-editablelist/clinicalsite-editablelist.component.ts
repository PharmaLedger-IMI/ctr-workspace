import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

// inspired on https://stackblitz.com/edit/angular-editable-list?file=src%2Fapp%2Fcomponents%2Flist-item%2Flist-item.component.ts
// and https://stackoverflow.com/questions/45659742/angular4-no-value-accessor-for-form-control/45659791
// and https://netbasal.com/adding-integrated-validation-to-custom-form-controls-in-angular-dc55e49639ae
// and https://stackoverflow.com/questions/45755958/how-to-get-formcontrol-instance-from-controlvalueaccessor

@Component({
  selector: 'app-clinicalsite-editablelist',
  templateUrl: './clinicalsite-editablelist.component.html',
  styleUrls: ['./clinicalsite-editablelist.component.css'],
  providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ClinicalSiteEditableListComponent),
        multi: true
      },
      {
        provide: NG_VALIDATORS,
        useExisting: ClinicalSiteEditableListComponent,
        multi: true
      }
    ]
})
export class ClinicalSiteEditableListComponent implements ControlValueAccessor, OnInit {

  formControl?: FormControl = undefined;
  ctr: any = { clinicalSites: [] };
  @Input() csCollection!: any[];
  @Input() label: string = '';
  newItem: boolean = false;
  newCsId: string = '';
  error: string = '';
  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() {
  }

  writeValue(obj: any): void {
    console.log("writeValue", obj);
    if (!obj)
      this.ctr = { clinicalSites: [] };
    else
      this.ctr = obj;
    if (!this.ctr.clinicalSites)
      this.ctr.clinicalSites = [];
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit(): void {
  }

  isValid(): boolean {
    return this.ctr
      && this.ctr.clinicalSites
      && this.ctr.clinicalSites.length >= 1;
  }

  validate(c: FormControl) {
    if (!this.formControl)
      this.formControl = c;
    const isValid = this.isValid();
    const isNotValid = !isValid;
    return isNotValid && {
      invalid: true
    };
  }
    
  onSubmit(): void {
    const self = this;
    self.newItem = false;
    self.newCsId = '';
    self.error = '';
  }

  onNewItem(): void {
    const self = this;
    self.newItem = true;
    self.newCsId = '';
    self.error = '';
  }

  onNewItemOpenedChange(opened: boolean): void {
    const self = this;
    if (!opened) {
      self.newItem = false;
      self.newCsId = '';
      self.error = '';
    }
  }

  onNewItemSelected(csId: string): void {
    console.log("onNewItemSelected", csId);
    const self = this;
    self.newItem = false;
    self.csCollection.forEach((cs) => {
      if (cs.id == csId) {
        self.ctr.clinicalSites.push(cs);
        // TODO remove after #14 - first site is also the default one
        if (self.ctr.clinicalSites.length === 1)
          self.ctr.clinicalSite.id = cs.id;
        self.onChange(self.ctr.clinicalSites);
        self.onTouch();
      }
    });
  }

  onRemoveItem(cs: any): void {
    const self = this;
    console.log("onRemoveItem", cs);
    self.ctr.clinicalSites = self.ctr.clinicalSites.filter( (aCs: { id: string; }) => {
      return aCs.id != cs.id;
    });
    // TODO remove after #14 - first site is also the default one
    if (self.ctr.clinicalSites.length >= 1)
      self.ctr.clinicalSite.id = self.ctr.clinicalSites[0].id;
    self.onChange(self.ctr.clinicalSites);
    self.onTouch();
  }

  canAddNewItem(): boolean {
    return this.newItem === false
      && this.getCsCollection().length > 0;
  }

  // list of sites, excluding those already selected.
  getCsCollection(): any[] {
    const self = this;
    let csCol2: any[] = [];
    let alreadySelectedCsIds: string[] = [];
    if (self.ctr.clinicalSites)
      alreadySelectedCsIds = self.ctr.clinicalSites.map((aCs: any) => aCs.id);
    self.csCollection.forEach((cs) => {
      if (alreadySelectedCsIds.indexOf(cs.id) < 0)
        csCol2.push(cs);
    });
    return csCol2;
  }

  getCsName(cs: any): string {
    //console.log("getCsName", cs);
    if (cs.name)
      return cs.name;
    if (!cs.id)
      return '?';
    for(let i=0; this.csCollection && i<this.csCollection.length; i++) {
      if (cs.id==this.csCollection[i].id) {
        return this.csCollection[i].name || '?2';
      }
    }
    return '?3';
  }
}
