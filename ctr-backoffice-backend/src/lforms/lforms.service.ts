import { Connection } from "typeorm";
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import * as FORM_DEF_CONDITION from '../formDefs/condition.json';
import * as FORM_DEF_TRIAL from '../formDefs/trial.json';
import { IHash } from "../ihash.interface";
import { ClinicalTrialQuestionType } from "../ctrial/clinicaltrialquestiontype.entity";
import { MatchResultClinicalTrial } from "../ctrial/matchresultclinicaltrial.dto";
import { MatchRequest } from "../ctrial/matchrequest.entity";
import { DateDiff } from "./datediff.class";
import { MatchResult } from "src/ctrial/matchresult.entity";

@Injectable()
export class LFormsService {

    dateDiff = new DateDiff();

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
    cqtItemAddExtension(item : any, propName: string, propValue: any) {
        if (!item['ctrExtension']) {
            item['ctrExtension'] = {};
        }
        item['ctrExtension'][propName] = propValue;
    }

    protected cqtItemAddCommonProps(item: any, cqt: ClinicalTrialQuestionType) {
        const qt = cqt.questionType;
    
        if (qt.restrictions) {
            item['restrictions'] = qt.restrictions;
        }
        
        if (qt.skipLogic) {
            item['skipLogic'] = qt.skipLogic;
        }

        this.cqtItemAddExtensionProps(item, cqt);
        //console.log("cqtItem", item, cqt);
    }

    protected cqtItemAddExtensionProps(item: any, cqt: ClinicalTrialQuestionType) {
        if (cqt.id)
            this.cqtItemAddExtension(item, "cqtIdCollection", [cqt.id]);    
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
            case 'DT': {
                return this.cqtDT2Item(cqt);
            }
            case 'QTY': {
                return this.cqtQTY2Item(cqt);
            }
            case 'TITLE': {
                return this.cqtTITLE2Item(cqt);
            }
            case 'YN': {
                return this.cqtYN2Item(cqt);
            }
            case 'YNNS': {
                return this.cqtYNNS2Item(cqt);
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

    protected cqtDT2Item(cqt: ClinicalTrialQuestionType) : any {
        const qt = cqt.questionType;
        const item = {
            "header": false,
            "dataType": "DT",
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
            "editable": "1"
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

    protected cqtYNNS2Item(cqt: ClinicalTrialQuestionType) : any {
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
                },
                {
                    "text": "Not sure",
                    "code": "notSure",
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

    protected cqtQTY2Item(cqt: ClinicalTrialQuestionType) : any {
        const qt = cqt.questionType;
        const item = {
            "header": false,
            "dataType": "QTY",
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
            "editable": "1"
        };
        this.cqtItemAddCommonProps(item, cqt);
        return item;
    };

    protected newItemTITLE(text: string, previousItem: any, css?: any) : any {
        const rInt : number = parseInt(""+(Math.random() * 10000000000), 10)
        const newCode : string = previousItem.localQuestionCode+"_criteria"+rInt;
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
            "editable": "0"
        };
        if (css) {
            item['displayControl'] = {
                "css": css 
            }
        }
        return item;
    };

    public newItemTITLECriteria(mr: MatchRequest, item: any, cqt: ClinicalTrialQuestionType) : any {
        const ctrId = cqt.clinicalTrial.id;
        const prefix = cqt.clinicalTrial.name+" "+cqt.clinicalTrial.nctNumber+" CRITERIA ";
        let criteria = cqt.criteria; // already checked that it is defined
        const origCriteria = cqt.criteria; // immutable
        const AGE="age";
        if (criteria.includes(AGE) && item.dataType=="DT") {
            if (!item.value) {
                return this.newItemTITLE(prefix+" SKIPPED: NO ANSWER"+" ; (MATCH Definition: "+origCriteria+")", item);
            }
            if (!/^(\d){4}-(\d){2}-(\d){2}$/.test(item.value)) {
                return this.newItemTITLE(prefix+" INTERNAL ERROR date not in format yyyy-mm-dd in '"+item.value+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")", item);
            }
            const y = item.value.substr(0,4);
            const m = item.value.substr(5,2) - 1;
            const d = item.value.substr(8,2);
            const dValue = new Date(y,m,d);
            if (dValue.getFullYear() != y && dValue.getMonth() != m && dValue.getDate() != d) {
               return this.newItemTITLE(prefix+"INTERNAL ERROR date not valid in format yyyy-mm-dd in '"+item.value+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")", item);
            }
            if (!mr.dsuData) {
               return this.newItemTITLE(prefix+"INTERNAL ERROR MatchRequest.dsuData missing! Cannot evaluate! (MATCH Definition: "+origCriteria+")", item);
            }
            if (!mr.dsuData.submittedOn) {
               return this.newItemTITLE(prefix+"INTERNAL ERROR MatchRequest.dsuData.submittedOn is '"+mr.dsuData.submittedOn+"' unparseable as Date! Cannot evaluate! (MATCH Definition: "+origCriteria+")", item);
            }
            let aNowDate = Date.parse(mr.dsuData.submittedOn);
            if (!aNowDate) {
               return this.newItemTITLE(prefix+"INTERNAL ERROR MatchRequest.dsuData.submittedOn is '"+mr.dsuData.submittedOn+"' unparseable as Date! Cannot evaluate! (MATCH Definition: "+origCriteria+")", item);
            }
            const age = this.dateDiff.inYears(dValue, new Date()) + "";
            const ageStr = ""+age;
            while (criteria.includes(AGE)) {
                criteria = criteria.replace(AGE, ageStr);
            }
        }
        const CODE="code";
        if (criteria.includes(CODE)) {
            // replace code with value
            if (!item.value || !item.value.code) {
                return this.newItemTITLE(prefix+"SKIPPED: NO ANSWER"+" ; (MATCH Definition: "+origCriteria+")", item);
            }
            while (criteria.includes(CODE)) {
                criteria = criteria.replace(CODE, JSON.stringify(item.value.code));
            }
        }
        const QTY="qty";
        if (criteria.includes(QTY)) {
            // replace code with value
            if (!item.value) {
                return this.newItemTITLE(prefix+"SKIPPED: NO ANSWER"+" ; (MATCH Definition: "+origCriteria+")", item);
            }
            while (criteria.includes(QTY)) {
                criteria = criteria.replace(QTY, parseInt(item.value)+""); // TODO injection ?
            }
        }
        const VALUE_LENGTH="value.length";
        if (criteria.includes(VALUE_LENGTH)) {
            // replace VALUE_LENGTH with value
            if (!item.value) {
                // assume empty array on a CNE 0 * - checkboxes
                while (criteria.includes(VALUE_LENGTH)) {
                    criteria = criteria.replace(VALUE_LENGTH, "0");
                }
            } else if (!Array.isArray(item.value)) {
                return this.newItemTITLE(prefix+"SKIPPED: value absent or not array"+" ; (MATCH Definition: "+origCriteria+")", item);
            } else { // item.value is Array for sure
                while (criteria.includes(VALUE_LENGTH)) {
                    criteria = criteria.replace(VALUE_LENGTH, item.value.length.toString());
                }
            }
        }
        let result : boolean = undefined;
        try {
            result = eval(criteria);
        } catch (error) {
            return this.newItemTITLE(prefix+"INTERNAL ERROR "+error+" ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")", item);
        }
        
        // increment the counts
        const mt = mr.matchResult;
        if (mt) {
            let trials : MatchResultClinicalTrial[] = mt.dsuData.trials;
            if (!trials) {
                return this.newItemTITLE(prefix+"INTERNAL ERROR MatchRequest.matchResult.trials is undefined", item);
            }
            let mtct : MatchResultClinicalTrial = trials.find( (mtct) => { return mtct.clinicalTrial && mtct.clinicalTrial.id === ctrId });
            if (!mtct) {
                return this.newItemTITLE(prefix+"INTERNAL ERROR MatchRequest.matchResult.trials[clinicalTrial.id="+ctrId+"] not found!", item);
            }
            mtct.criteriaCount++;
            if (result) {
                mtct.criteriaMatchedCount++;
            }
            console.log("Updated mtct", mtct);
        }

        return this.newItemTITLE(prefix+(result?"MATCH":"REJECT")+" ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")",
            item,
            result
                ? [{"name":"color","value":"darkgreen"}]
                : [{"name":"color","value":"red"}]
        );
    };

}