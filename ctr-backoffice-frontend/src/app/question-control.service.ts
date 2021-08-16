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
      qt.fAddToCriteria = (qt.criteria) ? true : false;
      if (qt.dataType.code=="YNNS"
        && (!qt.criteria || qt.criteria == "YNNS_YNS" || qt.criteria == "YNNS_NNS")
      ) {
        qt.fFreeCriteria="YNNS";
      } else {
        qt.fFreeCriteria="-";
      }
      if (qt.dataType.code=="CNE") {
        let sep = ' ; ';
        qt.fCneOptions = '';
        qt.answers!.forEach((qtAnswer) => {
          qt.fCneOptions += sep + qtAnswer.text;
          sep = ' / ';
        });
      }
      formControls[qt.localQuestionCode+"_k"] = new FormControl(qt.fAddToCriteria || false);
      formControls[qt.localQuestionCode+"_l"] = new FormControl(qt.criteriaLabel || '');
      formControls[qt.localQuestionCode+"_c"] = new FormControl(qt.criteria || '', Validators.required);
    });
    return new FormGroup(formControls);
  }
}