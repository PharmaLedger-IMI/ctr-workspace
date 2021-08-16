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
    if (this.qt.addToCriteria)
      return this.form.controls[this.qt.localQuestionCode+'_c'].valid;
    return true;
  }

  public addToCriteriaToggle(event: MatSlideToggleChange) {
    console.log('toggle', this.qt.localQuestionCode, event.checked);
    this.qt.addToCriteria = event.checked;
  }
}

