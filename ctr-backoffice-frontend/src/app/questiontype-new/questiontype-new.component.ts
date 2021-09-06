import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionType } from '../questiontype';
import { QuestionTypeService } from '../questiontype.service';

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
    codingInstructions: null,
    dataType: {
      code: 'YNNS',
      description: 'Choice list with No Exceptions Yes / No / Not sure or prefer not to answer'
    },
    answerCardinalityMin: 1,
    answerCardinalityMax: '1',
    answers: null,
    externallyDefined: undefined,
    units: undefined,
    restrictions: undefined,
    criteria: null,
    criteriaLabel: null,
    skipLogic: null,

    //
    fCneOptions: undefined,
    fFreeCriteria: undefined,
    fAddToCriteria: undefined
  };


  error: string = '';

  form!: FormGroup;

  // questionType fields
  qt: QuestionType = JSON.parse(JSON.stringify(this.blankQt));

  qdtCollection = [  
    {
      code: 'DT',
      description: 'Date'
    },
    {
      code: 'ST',
      description: 'String (one line of text)'
    },
    {
      code: 'TITLE',
      description: 'Display informative text (from the question text)'
    },
    {
      code: 'TX',
      description: 'String (multiple lines of text)'
    },
    {
      code: 'YN',
      description: 'Choice list with No Exceptions Yes / No'
    },
    {
      code: 'YNNS',
      description: 'Choice list with No Exceptions Yes / No / Not sure or prefer not to answer'
    }
   ];

  constructor(
    private qtService: QuestionTypeService
  ) { }

  ngOnInit(): void {
    const self = this;
    self.error = '';
    self.qt = JSON.parse(JSON.stringify(self.blankQt));
  }

  onSubmit(): void {
    const self = this;
    console.log("ADD button pressed");
    self.qtService.post(self.qt).subscribe(
      (qt) => {
        console.log("QT created", qt);
      }, (error) => {
        console.log("QT ERR", error);
        self.error = error;
      });
    // 1 - create questionType on REST services
    // 2 - add the questionType to the 
    this.onClear();
  }

  onClear(): void {
    const self = this;
    console.log("CLEAR button pressed");
    self.error = '';
    self.qt = JSON.parse(JSON.stringify(self.blankQt));
  }

  isQMarkMissing() : boolean {
    if (this.qt && this.qt.question) {
      return !this.qt.question.endsWith('?');
    }
    return false;
  }
}
