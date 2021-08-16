// based on https://angular.io/guide/dynamic-form#compose-form-groups
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionType } from './questiontype';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionType[]) {
    const group: any = {};

    questions.forEach(question => {
      group[question.localQuestionCode] = (question.answerCardinalityMin>=1)
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}