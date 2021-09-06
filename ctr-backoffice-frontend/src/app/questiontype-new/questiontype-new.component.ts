import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionType } from '../questiontype';

@Component({
  selector: 'app-questiontype-new',
  templateUrl: './questiontype-new.component.html',
  styleUrls: ['./questiontype-new.component.css']
})
export class QuestionTypeNewComponent implements OnInit {

  // blank question definition
  blankQt: QuestionType = {
    localQuestionCode: '',
    question: '',
    codingInstructions: '',
    dataType: {
      code: 'YNNS',
      description: 'Choice list with No Exceptions Yes / No / Not sure or prefer not to answer'
    },
    answerCardinalityMin: 1,
    criteria: '',
    criteriaLabel: '',
    skipLogic: {},
    answers: [],

    //
    fCneOptions: undefined,
    fFreeCriteria: undefined,
    fAddToCriteria: undefined
  };

  form!: FormGroup;

  // questionType fields
  qt: QuestionType = JSON.parse(JSON.stringify(this.blankQt));

  qdtCollection = [ this.blankQt.dataType ];

  constructor() { }

  ngOnInit(): void {
    const self = this;
    self.qt = JSON.parse(JSON.stringify(self.blankQt));
  }

  onSubmit(): void {
    console.log("ADD button pressed");
    // TODO
    // 1 - create questionType on REST services
    // 2 - add the questionType to the 
    this.onClear();
  }

  onClear(): void {
    console.log("CLEAR button pressed");
    this.qt = JSON.parse(JSON.stringify(this.blankQt));
  }

  isQMarkMissing() : boolean {
    if (this.qt && this.qt.question) {
      return !this.qt.question.endsWith('?');
    }
    return false;
  }
}
