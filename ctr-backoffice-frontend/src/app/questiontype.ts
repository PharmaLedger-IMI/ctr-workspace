export interface QuestionType {

    localQuestionCode: string;

    question: string;

    codingInstructions: string;

    dataType: any;

    answerCardinalityMin: number;

    answers: any[] | undefined;

    criteria: string | undefined;

    criteriaLabel: string | undefined;

    skipLogic: any;

    // used by the frontend - not supplied by the REST backend
    
    fCneOptions: string | undefined;

    fFreeCriteria: string | undefined;

    fAddToCriteria: boolean | undefined;
}
