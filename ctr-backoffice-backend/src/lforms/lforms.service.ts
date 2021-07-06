import { Connection } from "typeorm";
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import * as FORM_DEF_CONDITION from '../formDefs/condition.json';
import * as FORM_DEF_TRIAL from '../formDefs/trial.json';
import { QuestionType } from "src/ctrial/questiontype.entity";

@Injectable()
export class LFormsService {
    constructor(
        private connection: Connection,
    ) { }

    getConditionTemplate() : any {
        const formDef = JSON.parse(JSON.stringify(FORM_DEF_CONDITION));
        formDef.items = []; // clean array
        return formDef;
    }

    getTrialTemplate() : any {
        const formDef = JSON.parse(JSON.stringify(FORM_DEF_TRIAL));
        formDef.items = []; // clean array
        return formDef;
    }

    /**
     * Convert a fully loaded QuestionType enytity into an LForms item JSON.
     * @param qt 
     */
    qt2Item(qt: QuestionType) : any {
        const qdt = qt.dataType;
        switch(qdt.code) {
            case 'CNE': {
                return this.qtCNE2Item(qt);
            }
            case 'TITLE': {
                return this.qtTITLE2Item(qt);
            }
            case 'YN': {
                return this.qtYN2Item(qt);
            }
            default: {
                throw new InternalServerErrorException('QuestionDataType.code='+qdt.code+' not supported on LFormsService.qt2Item');
            }
        }
    };

    protected qtCNE2Item(qt: QuestionType) : any {
        const item = {
            "header": false,
            "dataType": "CNE",
            "question": qt.question,
            "linkId": qt.localQuestionCode,
            "localQuestionCode": qt.localQuestionCode,
            "questionCardinality": {
                "min": "1",
                "max": "1"
            },
            "answerCardinality": {
                "min": ""+qt.answerCardinalityMin,
                "max": qt.answerCardinalityMax
            },
            "editable": "1",
            "answers": qt.answers,
            "displayControl": {
                "answerLayout": {
                    "type": "RADIO_CHECKBOX"
                }
            }
        };
        if (qt.skipLogic) item['skipLogic'] = qt.skipLogic;
        return item;
    }

    protected qtTITLE2Item(qt: QuestionType) : any {
        const item = {
            "header": false,
            "dataType": "TITLE",
            "question": qt.question,
            "linkId": qt.localQuestionCode,
            "localQuestionCode": qt.localQuestionCode,
            "questionCardinality": {
                "min": "1",
                "max": "++"
            },
            "answerCardinality": {
                "min": "0",
                "max": "0"
            },
            "editable": "1",
            "answers": [],
            "displayControl": {
                "answerLayout": {
                    "type": "RADIO_CHECKBOX"
                }
            }
        };
        if (qt.skipLogic) item['skipLogic'] = qt.skipLogic;
        return item;
    };

    protected qtYN2Item(qt: QuestionType) : any {
        const item = {
            "header": false,
            "dataType": "CNE",
            "question": qt.question,
            "linkId": qt.localQuestionCode,
            "localQuestionCode": qt.localQuestionCode,
            "questionCardinality": {
                "min": "1",
                "max": "1"
            },
            "answerCardinality": {
                "min": ""+qt.answerCardinalityMin,
                "max": qt.answerCardinalityMax
            },
            "editable": "1",
            "answers": [
                {
                    "text": "Yes",
                    "code": "yes",
                    "system": null,
                    "label": null,
                    "score": null
                },
                {
                    "text": "No",
                    "code": "no",
                    "system": null,
                    "label": null,
                    "score": null
                }
            ],
            "displayControl": {
                "answerLayout": {
                    "type": "RADIO_CHECKBOX"
                }
            }
        };
        if (qt.skipLogic) item['skipLogic'] = qt.skipLogic;
        return item;
    };
}