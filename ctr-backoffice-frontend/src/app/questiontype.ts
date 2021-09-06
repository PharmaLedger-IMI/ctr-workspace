export interface QuestionType {

    localQuestionCode: string;

    question: string;

    codingInstructions: string | null;

    dataType: any;

    answerCardinalityMin: number;

    answerCardinalityMax: string | undefined;

    answers: any[] | undefined | null;

    externallyDefined: string | undefined | null;

    units: string | undefined | null;

    restrictions: any | undefined | null;

    criteria: string | undefined | null;

    criteriaLabel: string | undefined | null;

    skipLogic: any | null;

    // used by the frontend - not supplied by the REST backend
    
    fCneOptions: string | undefined;

    fFreeCriteria: string | undefined;

    fAddToCriteria: boolean | undefined;
}
