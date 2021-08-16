export interface QuestionType {

    localQuestionCode: string;

    question: string;

    codingInstructions: string;

    dataType: any;

    answerCardinalityMin: number;

    criteria: string;

    skipLogic: any;

    value: any; // an object that is undefined for absent answer.
}
