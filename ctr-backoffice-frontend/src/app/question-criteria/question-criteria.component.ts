import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';

import { QuestionType } from '../questiontype';

@Component({
  selector: 'app-question-criteria',
  templateUrl: './question-criteria.component.html',
  styleUrls: ['./question-criteria.component.css']
})
export class QuestionCriteriaComponent {
  @Input() qt!: QuestionType;
  @Input() form!: FormGroup;

  dtAgeLower: number = 0;
  dtAgeUpper: number = 0;

  // DT patterns recognized from the criteria expression
  reDtAgeLower = new RegExp("^age>=([0-9]+)(\&\&age<=[0-9]+)?$", "g");
  reDtAgeUpper = new RegExp("^(age>=[0-9]+\&\&)?age<=([0-9]+)?$", "g");

  constructor() { 
  }


  ngOnInit(): void {
    const self = this;
    self.dtAgeLower = self.getDtAgeLowerLimit();
    self.dtAgeUpper = self.getDtAgeUpperLimit();
  }

  get isValid() {
    console.log("VALID");
    let valid = true;
    if (this.qt.fAddToCriteria)
       valid = this.form.controls[this.qt.localQuestionCode+'_c'].valid;
    console.log("valid "+this.qt.localQuestionCode+"="+valid);
    return valid;
  }

  public addToCriteriaToggle(event: MatSlideToggleChange) {
    console.log('toggle', this.qt.localQuestionCode, event.checked);
    this.qt.fAddToCriteria = event.checked;
  }

  public changeDtAgeLower(event: MatSliderChange) : void {
    const value = event.value;
    this.changeDtAgeRange(value, this.dtAgeUpper);
  }

  public changeDtAgeUpper(event: MatSliderChange) : void {
    const value = event.value;
    this.changeDtAgeRange(this.dtAgeLower, value);
  }

  public changeDtAgeRange(lowerValue : any, upperValue : any) {
    console.log("change", lowerValue, upperValue);
    let criteria = '';
    if (lowerValue)
      criteria="age>="+lowerValue;
    if (upperValue) {
      if (criteria)
        criteria+="&&";
      criteria+="age<="+upperValue; 
    }
    // Just update the form field value.
    // ClinicalTrialQuestionTypeGroupComponent will generate new QuestionType objects on save.
    this.form.get(this.qt.localQuestionCode+"_c")?.setValue(criteria);
    //this.qt.criteria = criteria;
  }

  public getDtAgeLowerLimit() : number {
    // only works for DT age criterias
    const criteria = this.form.get(this.qt.localQuestionCode+"_c")?.value;
    console.log("lower current criteria", criteria);
    if (!criteria || typeof criteria != "string")
      return 0;
    const matchArray = this.reDtAgeLower.exec(criteria);
    if (matchArray && matchArray.length>=2)
      return parseInt(matchArray[1]);
    return 0;
  }

  public getDtAgeUpperLimit() : number {
    // only works for DT age criterias
    const criteria = this.form.get(this.qt.localQuestionCode+"_c")?.value;
    console.log("upper current criteria", criteria);
    if (!criteria || typeof criteria != "string")
      return 0;
    const matchArray = this.reDtAgeUpper.exec(criteria);
    if (matchArray && matchArray.length==2)
      return parseInt(matchArray[1]);
    if (matchArray && matchArray.length==3)
      return parseInt(matchArray[2]);
    return 0;
  }
}

