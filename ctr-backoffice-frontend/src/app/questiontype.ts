export interface QuestionType {

    localQuestionCode: string;

    question: string;

    codingInstructions: string;

    dataType: any;

    answerCardinalityMin: number;

    criteria: string;

    criteriaLabel: string | undefined;

    skipLogic: any;

    // used by the frontend - not supplied by the REST backend
    
    value: any; // an object that is undefined for absent answer.

    addToCriteria: boolean | undefined;
}
