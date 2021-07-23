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

    /**
     * For each item that has criteria, append a new item (question title item)
     * with the criteria evaluation.
     * @param lform form object to be enriched. Needs only to be initialized with a JSON.parse
     * @param cqtMap optional map of ClinicalTrialQuestionType indexed by localQuestionCode
     */
    async enrichWithCriteria(mr: MatchRequest, lform: any, cqtCollection?: ClinicalTrialQuestionType[]) : Promise<void> {
        const items = lform.items;
        if (!items) {
            throw new InternalServerErrorException('Missing items in form '+JSON.stringify(lform));
        }
        if (!Array.isArray(items)) {
            throw new InternalServerErrorException('lform.items is not an Array in lform '+JSON.stringify(lform));
        }
        let cqtMap : IHash = undefined;
        if (cqtCollection) {
            if (!Array.isArray(cqtCollection)) {
                throw new InternalServerErrorException('cqtCollection is not an Array in '+JSON.stringify(cqtCollection));
            }
            if (cqtCollection.length<=0) {
                throw new InternalServerErrorException('cqtCollection is an empty Array in lform '+JSON.stringify(lform));
            }
            cqtMap = {};
            cqtCollection.forEach((cqt) => {
               cqtMap[cqt.questionType.localQuestionCode] = cqt;
            });
        }
        const newItems = items.reduce((accum, item) => {
                //console.log("Checking item", item, cqtMap);
                accum.push(item);
                if (cqtMap) {
                    const cqt = cqtMap[item.localQuestionCode];
                    if (cqt && cqt.criteria) {
                        this.cqtItemAddExtensionProps(item, cqt);
                    }
                }
                if (item.ctrExtension
                    && (item.ctrExtension.cqtCriteria || item.ctrExtension.qtCriteria)) {
                    const criteriaItem = this.newItemTITLECriteria(mr, item);
                    accum.push(criteriaItem);
                }
                return accum;
            },
            []
        );
        lform.items = newItems;
    }

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

        this.cqtItemAddExtensionProps(item, cqt);
    }

    protected cqtItemAddExtensionProps(item: any, cqt: ClinicalTrialQuestionType) {
        const qt = cqt.questionType;

        if (cqt.id)
            this.cqtItemAddExtension(item, "cqtId", cqt.id);
    
        if (cqt.clinicalTrial && cqt.clinicalTrial.id)
            this.cqtItemAddExtension(item, "ctrId", cqt.clinicalTrial.id);
    
        if (cqt.criteria) { // cqt.criteria has precedence over qt.criteria
            this.cqtItemAddExtension(item, "cqtCriteria", cqt.criteria);
        } else if (qt.criteria) {
            this.cqtItemAddExtension(item, "qtCriteria", qt.criteria);
        }        
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

    protected newItemTITLECriteria(mr: MatchRequest, item: any) : any {
        let ctrId : string = item.ctrExtension.ctrId;
        if (!ctrId) {
            return this.newItemTITLE("CRITERIA MISSING EXTENSION ctrId ?????", item);
        }
        let criteria : string = item.ctrExtension.cqtCriteria || item.ctrExtension.qtCriteria;
        if (!criteria)
            return this.newItemTITLE("CRITERIA MISSING ?????", item);
        const origCriteria = criteria;
        const CODE="code";
        if (criteria.includes(CODE)) {
            // replace code with value
            if (!item.value || !item.value.code) {
                return this.newItemTITLE("CRITERIA SKIPPED: NO ANSWER"+" ; (MATCH Definition: "+origCriteria+")", item);
            }
            while (criteria.includes(CODE)) {
                criteria = criteria.replace(CODE, JSON.stringify(item.value.code));
            }
        }
        const AGE="age";
        if (criteria.includes(AGE) && item.dataType=="DT") {
            //item.value="2016-07-19"; Test failure
            if (!item.value) {
                return this.newItemTITLE("CRITERIA SKIPPED: NO ANSWER"+" ; (MATCH Definition: "+origCriteria+")", item);
            }
            if (!/^(\d){4}-(\d){2}-(\d){2}$/.test(item.value)) {
                return this.newItemTITLE("CRITERIA INTERNAL ERROR date not in format yyyy-mm-dd in '"+item.value+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")", item);
            }
            const y = item.value.substr(0,4);
            const m = item.value.substr(5,2) - 1;
            const d = item.value.substr(8,2);
            const dValue = new Date(y,m,d);
            if (dValue.getFullYear() != y && dValue.getMonth() != m && dValue.getDate() != d) {
               return this.newItemTITLE("CRITERIA INTERNAL ERROR date not valid in format yyyy-mm-dd in '"+item.value+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")", item);
            }
            if (!mr.dsuData) {
               return this.newItemTITLE("CRITERIA INTERNAL ERROR MatchRequest.dsuData missing! Cannot evaluate! (MATCH Definition: "+origCriteria+")", item);
            }
            if (!mr.dsuData.submittedOn) {
               return this.newItemTITLE("CRITERIA INTERNAL ERROR MatchRequest.dsuData.submittedOn is '"+mr.dsuData.submittedOn+"' unparseable as Date! Cannot evaluate! (MATCH Definition: "+origCriteria+")", item);
            }
            let aNowDate = Date.parse(mr.dsuData.submittedOn);
            if (!aNowDate) {
               return this.newItemTITLE("CRITERIA INTERNAL ERROR MatchRequest.dsuData.submittedOn is '"+mr.dsuData.submittedOn+"' unparseable as Date! Cannot evaluate! (MATCH Definition: "+origCriteria+")", item);
            }
            const age = this.dateDiff.inYears(dValue, new Date()) + "";
            const ageStr = ""+age;
            while (criteria.includes(AGE)) {
                criteria = criteria.replace(AGE, ageStr);
            }
        }
        let result : boolean = undefined;
        try {
            result = eval(criteria);
        } catch (error) {
            return this.newItemTITLE("CRITERIA INTERNAL ERROR "+error+" ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")", item);
        }
        
        // increment the counts
        let error = this.updateMtct(mr, item, result, ctrId);
        if (error)
            return error;

        return this.newItemTITLE("CRITERIA "+(result?"MATCH":"REJECT")+" ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")",
         item,
         result
            ? [{"name":"color","value":"darkgreen"}]
            : [{"name":"color","value":"red"}]
        );
    };

    protected updateMtct(mr: MatchRequest, item: any, result: boolean, ctrId: string) : any {
        let mt = mr.matchResult;
        if (mt) {
            let trials : MatchResultClinicalTrial[] = mt.dsuData.trials;
            if (!trials) {
                return this.newItemTITLE("CRITERIA INTERNAL ERROR MatchRequest.matchResult.trials is undefined", item);
            }
            let mtct : MatchResultClinicalTrial = trials.find( (mtct) => { return mtct.clinicalTrial && mtct.clinicalTrial.id === ctrId });
            if (!mtct) {
                return this.newItemTITLE("CRITERIA INTERNAL ERROR MatchRequest.matchResult.trials[clinicalTrial.id="+ctrId+"] not found!", item);
            }
            mtct.criteriaCount++;
            if (result) {
                mtct.criteriaMatchedCount++;
            }
            //console.log("Updated mtct", mtct);
        }
        return undefined;
    }

}