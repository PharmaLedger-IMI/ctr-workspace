// based on https://angular.io/guide/dynamic-form#compose-form-groups
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionType } from './questiontype';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(qtArray: QuestionType[]) : FormGroup {
    const formControls: any = {};

    qtArray.forEach(qt => {
      qt.addToCriteria = (qt.criteria) ? true : false;
      formControls[qt.localQuestionCode+"_k"] = new FormControl(qt.addToCriteria || '');
      formControls[qt.localQuestionCode+"_l"] = new FormControl(qt.criteriaLabel || '');
      formControls[qt.localQuestionCode+"_c"] = new FormControl(qt.criteria || '', Validators.required);
    });
    return new FormGroup(formControls);
  }
}