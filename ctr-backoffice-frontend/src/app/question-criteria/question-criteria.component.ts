import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { QuestionType } from '../questiontype';

@Component({
  selector: 'app-question-criteria',
  templateUrl: './question-criteria.component.html',
  styleUrls: ['./question-criteria.component.css']
})
export class QuestionCriteriaComponent {
  @Input() qt!: QuestionType;
  @Input() form!: FormGroup;

  constructor() { 
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
}

