import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { QuestionType } from '../questiontype';

@Component({
  selector: 'app-question-criteria',
  templateUrl: './question-criteria.component.html',
  styleUrls: ['./question-criteria.component.css']
})
export class QuestionCriteriaComponent {
  @Input() question!: QuestionType;
  @Input() form!: FormGroup;
  addToCriteria: boolean = true;

  constructor() { 
  }

  get isValid() { return this.form.controls[this.question.localQuestionCode].valid; }
}

