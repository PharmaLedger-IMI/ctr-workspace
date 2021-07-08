import { Connection } from "typeorm";
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import * as FORM_DEF_CONDITION from '../formDefs/condition.json';
import * as FORM_DEF_TRIAL from '../formDefs/trial.json';
import { QuestionType } from "src/ctrial/questiontype.entity";
import { ClinicalTrialQuestionType } from "src/ctrial/clinicaltrialquastiontype.entity";

@Injectable()
export class LFormsService {

    /**
     * For each item that has criteria, append a new item (question title item)
     * with the criteria evaluation.
     * @param lform form object to be enriched. Needs only to be initialized with a JSON.parse
     */    
    enrichWithCriteria(lform: any) : void {
        const items = lform.items;
        if (!items) {
            throw new InternalServerErrorException('Missing items in form '+JSON.stringify(lform));
        }
        if (!Array.isArray(items)) {
            throw new InternalServerErrorException('lform.items is not an Array in lform '+JSON.stringify(lform));
        }
        const newItems = items.reduce((accum, item) => {
                console.log("Checking item", item);
                accum.push(item);
                if (item.ctrExtension && item.ctrExtension.qtCriteria) {
                    const criteriaItem = this.newItemTITLECriteria(item);
                    accum.push(criteriaItem);
                }
                return accum;
            },
            []
        );
        lform.items = newItems;
    }

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
     * Add a property to a ctrExtension property object, preserved by LForms.
     * @param {object} item item to mutate
     * @param {string} propName 
     * @param {string} propValue 
     */
    cqtItemAddExtension(item : any, propName: string, propValue: string) {
        if (!item['ctrExtension']) {
            item['ctrExtension'] = {};
        }
        item['ctrExtension'][propName] = propValue;
    }

    protected cqtItemAddCommonProps(item: any, cqt: ClinicalTrialQuestionType) {
        const qt = cqt.questionType;
    
        if (qt.skipLogic) {
            item['skipLogic'] = qt.skipLogic;
        }
    
        this.cqtItemAddExtension(item, "cqtId", cqt.id);
    
        if (qt.criteria)
            this.cqtItemAddExtension(item, "qtCriteria", qt.criteria);
    }

    /**
     * Convert a fully loaded QuestionType enytity into an LForms item JSON.
     * @param qt 
     */
    cqt2Item(cqt: ClinicalTrialQuestionType) : any {
        const qt = cqt.questionType;
        const qdt = qt.dataType;
        switch(qdt.code) {
            case 'CNE': {
                return this.cqtCNE2Item(cqt);
            }
            case 'TITLE': {
                return this.cqtTITLE2Item(cqt);
            }
            case 'YN': {
                return this.cqtYN2Item(cqt);
            }
            default: {
                throw new InternalServerErrorException('QuestionDataType.code='+qdt.code+' not supported on LFormsService.qt2Item');
            }
        }
    };

    protected cqtCNE2Item(cqt: ClinicalTrialQuestionType) : any {
        const qt = cqt.questionType;
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
        this.cqtItemAddCommonProps(item, cqt);
        return item;
    }

    protected cqtTITLE2Item(cqt: ClinicalTrialQuestionType) : any {
        const qt = cqt.questionType;
        const item = {
            "header": false,
            "dataType": "TITLE",
            "question": qt.question,
            "linkId": qt.localQuestionCode,
            "localQuestionCode": qt.localQuestionCode,
            "questionCardinality": {
                "min": "1",
                "max": "1"
            },
            "answerCardinality": {
                "min": "0",
                "max": "0"
            },
            "editable": "1"
        };
        this.cqtItemAddCommonProps(item, cqt);
        return item;
    };

    protected cqtYN2Item(cqt: ClinicalTrialQuestionType) : any {
        const qt = cqt.questionType;
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
        this.cqtItemAddCommonProps(item, cqt);
        return item;
    };



    protected newItemTITLE(text: string, previousItem: any, css?: any) : any {
        const newCode : string = previousItem.localQuestionCode+"_criteria";
        const item = {
            "header": false,
            "dataType": "TITLE",
            "question": text,
            "linkId": newCode,
            "localQuestionCode": newCode,
            "questionCardinality": {
                "min": "1",
                "max": "1"
            },
            "answerCardinality": {
                "min": "0",
                "max": "0"
            },
            "editable": "1"
        };
        if (css) {
            item['displayControl'] = {
                "css": css 
            }
        }
        return item;
    };

    protected newItemTITLECriteria(item: any) : any {
        let criteria = item.ctrExtension.qtCriteria;
        if (!criteria)
            return this.newItemTITLE("CRITERIA ?????", item);
        const CODE="code";
        if (criteria.includes(CODE)) {
            // replace code with value
            if (!item.value || !item.value.code) {
                return this.newItemTITLE("CRITERIA: "+criteria+" NO ANSWER - SKIPPED", item);
            }
            while (criteria.includes(CODE)) {
                criteria = criteria.replace(CODE, JSON.stringify(item.value.code));
            }
        }
        let result : boolean = undefined;
        try {
            result = eval(criteria);
        } catch (error) {
            return this.newItemTITLE("CRITERIA: "+criteria+" INTERNAL ERROR "+error, item);
        }
        return this.newItemTITLE("CRITERIA: "+criteria+" "+(result?"MATCH":"REJECT"),
         item,
         result
         ? [{"name":"color","value":"darkgreen"}]
         : [{"name":"color","value":"red"}]
        );
    };

}