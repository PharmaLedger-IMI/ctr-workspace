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
import { MatchResultEnrichContext } from "src/ctrial/matchresultenrichcontext.class";

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
     * @param {string} propValue if this propName already exists in item as an array, then propValue must also be an array, and values are appended.
     */
    cqtItemAddExtension(item : any, propName: string, propValue: any) {
        if (!item['ctrExtension']) {
            item['ctrExtension'] = {};
        }
        if (!item['ctrExtension'][propName] || !Array.isArray(item['ctrExtension'][propName]))
            item['ctrExtension'][propName] = propValue;
        else
            item['ctrExtension'][propName].push(...propValue); // append to array
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

    public cqtItemAddExtensionProps(item: any, cqt: ClinicalTrialQuestionType) {
        if (cqt.id)
            this.cqtItemAddExtension(item, "cqtIdCollection", [cqt.id]);
        // ctrIdCollection is redundant as it could be computed from cqtIdCollection
        // ... but is added to prevent the need for an extra DB ClinicalTrialQuestionType read.
        if (cqt.clinicalTrial?.id)
            this.cqtItemAddExtension(item, "ctrIdCollection", [cqt.clinicalTrial?.id]);  
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
                    "text": "Not sure or prefer not to answer",
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

    /**
     * Get a valid criteria label. If there is not criteriaLabel,
     * fallback on to questionType.criteriaLabel and then fallback
     * on the JS expression cqt.criteria
     * @param cqt 
     * @returns a string that is never empty or undefined
     */
    public cqtGetCriteriaLabel(cqt: ClinicalTrialQuestionType) : string {
        if (cqt.criteriaLabel)
            return cqt.criteriaLabel; // there is a user-readble text criteria label defined by the sponsor
        if (cqt.questionType.criteriaLabel)
            return cqt.questionType.criteriaLabel; // there is a default user-readble text criteria label defined by the sponsor for all these questionType
        if (cqt.criteria) {
            return this.cqtPreDefinedCriteriaExplained(cqt.criteria);
        }
        if (cqt.questionType.criteria) {
            return this.cqtPreDefinedCriteriaExplained(cqt.questionType.criteria);
        }
        return '?'; // if it gets here, there is a bug somewhere else
    }

    /**
     * Returns a string explaining a criteria expression. Recognizes a few special predefined cases.
     * @param criteria a JS expression or a predefined criteria code.
     * @returns an explanation of criteria, or the criteria expression itself.
     */
    public cqtPreDefinedCriteriaExplained(criteria: string) : string {
        if (criteria == "YN_Y") {
            return "must answer Yes (+1 confidence)";
        } else if (criteria == "YN_N") {
            return "must answer No (+1 confidence)";
        } else if (criteria == "YNNS_YNS") {
            return "must answer Yes (+1 confidence) or Not Sure (+0 confidence)";
        } else if (criteria == "YNNS_NNS") {
            return "must answer No (+1 confidence) or Not Sure (+0 confidence)";
        }
        return criteria;
    }

    public cqtGetCriteriaTITLEText(mtec: MatchResultEnrichContext) : string {
        return "CRITERIA: "+this.cqtGetCriteriaLabel(mtec.cqt);
    }

    protected newDebugItemTITLE(mtec: MatchResultEnrichContext, text: string, css?: any) : any {
        const item = this.newItemTITLE(mtec, text, css);
        this.cqtItemAddExtension(item, "debug", true);
        return item;
    }

    protected newItemTITLEMatchWithConfidence(mtec: MatchResultEnrichContext) : any {
        const item = this.newItemTITLE(mtec, this.cqtGetCriteriaTITLEText(mtec),
            [{"name":"color","value":"darkgreen"}]);
        return item;
    }
    
    protected newItemTITLEMatchNoConfidence(mtec: MatchResultEnrichContext) : any {
        const item = this.newItemTITLE(mtec, this.cqtGetCriteriaTITLEText(mtec),
            [{"name":"color","value":"olive"}]); // olive looks like a dark yellow
        return item;
    }
    
    protected newItemTITLEReject(mtec: MatchResultEnrichContext) : any {
        const item = this.newItemTITLE(mtec, this.cqtGetCriteriaTITLEText(mtec),
            [{"name":"color","value":"red"}]);
        return item;
    }

    protected newItemTITLE(mtec: MatchResultEnrichContext, text: string, css?: any) : any {
        const previousItem = mtec.item;
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

        this.cqtItemAddExtensionProps(item, mtec.cqt);

        mtec.items.push(item);

        return item;
    };

    /**
     * Evaluate a criteria, and increment match count
     */
    public newItemTITLECriteria(mtec: MatchResultEnrichContext) : any {
        const mr = mtec.mr;
        const item = mtec.item;
        const cqt = mtec.cqt;
        const ctrId = cqt.clinicalTrial.id;
        const prefix = cqt.clinicalTrial.name+" "+cqt.clinicalTrial.nctNumber+" CRITERIA ";
        let criteria = cqt.criteria; // already checked that it is defined
        const origCriteria = cqt.criteria; // immutable
        let result : boolean = undefined;
        let confidence : boolean = undefined;

        // test pre-defined criteria first
        if (criteria=="YN_Y") {
            if (cqt.questionType.dataType.code!="YN") {
                return this.newDebugItemTITLE(mtec, prefix+" INTERNAL ERROR criteria YN_Y is not allowed for cqt.qt.dataType is '"+cqt.questionType.dataType.code+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")");   
            }
            if (item.dataType!="CNE") {
                return this.newDebugItemTITLE(mtec, prefix+" INTERNAL ERROR criteria YNNS_YNS is only allowed item dataType 'CNE', not for '"+item.dataType+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")");
            }
            if (!item.value || !item.value.code) {
                return this.newDebugItemTITLE(mtec, prefix+"SKIPPED: NO ANSWER"+" ; (MATCH Definition: "+origCriteria+")");
            }
            result = (item.value.code=="yes");
            confidence = result;
        } else if (criteria=="YN_N") {
            if (cqt.questionType.dataType.code!="YN") {
                return this.newDebugItemTITLE(mtec, prefix+" INTERNAL ERROR criteria YN_N is not allowed for cqt.qt.dataType is '"+cqt.questionType.dataType.code+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")");
            }
            if (item.dataType!="CNE") {
                return this.newDebugItemTITLE(mtec, prefix+" INTERNAL ERROR criteria YNNS_NNS is only allowed item dataType 'CNE', not for '"+item.dataType+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")");
            }
            if (!item.value || !item.value.code) {
                return this.newDebugItemTITLE(mtec, prefix+"SKIPPED: NO ANSWER"+" ; (MATCH Definition: "+origCriteria+")");
            }
            result = (item.value.code=="no");
            confidence = result;
        } else if (criteria=="YNNS_YNS") {
            if (cqt.questionType.dataType.code!="YNNS") {
                return this.newDebugItemTITLE(mtec, prefix+" INTERNAL ERROR criteria YNNS_YNS is not allowed for cqt.qt.dataType is '"+cqt.questionType.dataType.code+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")"); 
            }
            if (item.dataType!="CNE") {
                return this.newDebugItemTITLE(mtec, prefix+" INTERNAL ERROR criteria YNNS_YNS is only allowed item dataType 'CNE', not for '"+item.dataType+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")");  
            }
            if (!item.value || !item.value.code) {
                return this.newDebugItemTITLE(mtec, prefix+"SKIPPED: NO ANSWER"+" ; (MATCH Definition: "+origCriteria+")");
            }
            result = (item.value.code=="yes"||item.value.code=="notSure");
            confidence = (item.value.code=="yes");
        } else if (criteria=="YNNS_NNS") {
            if (cqt.questionType.dataType.code!="YNNS") {
                return this.newDebugItemTITLE(mtec, prefix+" INTERNAL ERROR criteria YNNS_NNS is not allowed for cqt.qt.dataType is '"+cqt.questionType.dataType.code+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")");
            }
            if (item.dataType!="CNE") {
                return this.newDebugItemTITLE(mtec, prefix+" INTERNAL ERROR criteria YNNS_NNS is only allowed item dataType 'CNE', not for '"+item.dataType+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")");  
            }
            if (!item.value || !item.value.code) {
                return this.newDebugItemTITLE(mtec, prefix+"SKIPPED: NO ANSWER"+" ; (MATCH Definition: "+origCriteria+")");
            }
            result = (item.value.code=="no"||item.value.code=="notSure");
            confidence = (item.value.code=="no");
        } else {
            // Fallback to expression evaluation
            return this.newItemTITLECriteriaExpression(mtec);
        }
        
        // If it was a predefined criteria, then result and confidence are defined.
        // If it was an expression, it never gets here.

        // increment the counts
        const mt = mr.matchResult;
        if (mt) {
            let trials : MatchResultClinicalTrial[] = mt.dsuData.trials;
            if (!trials) {
                return this.newDebugItemTITLE(mtec, prefix+"INTERNAL ERROR MatchRequest.matchResult.trials is undefined", item);
            }
            let mtct : MatchResultClinicalTrial = trials.find( (mtct) => { return mtct.clinicalTrial && mtct.clinicalTrial.id === ctrId });
            if (!mtct) {
                return this.newDebugItemTITLE(mtec, prefix+"INTERNAL ERROR MatchRequest.matchResult.trials[clinicalTrial.id="+ctrId+"] not found!");
            }
            mtct.criteriaCount++;
            if (result) {
                mtct.criteriaMatchedCount++;
                if (confidence) {
                    mtct.criteriaConfidenceCount++;
                    if (cqt.criteriaLabel) { // only explain to the patient if there is a defined criteriaLabel
                        mtct.criteriaExplained += '<li><span class="match-img"></span>'+cqt.criteriaLabel+'</li>';
                    }
                    this.newItemTITLEMatchWithConfidence(mtec);
                } else {
                    if (cqt.criteriaLabel) { // only explain to the patient if there is a defined criteriaLabel
                        mtct.criteriaExplained += '<li><span class="not-match-img"></span>'+cqt.criteriaLabel+'</li>';
                    }
                    this.newItemTITLEMatchNoConfidence(mtec);
                }
            } else {
                if (cqt.criteriaLabel) { // only explain to the patient if there is a defined criteriaLabel
                    mtct.criteriaExplained += '<li><span class="reject-img"></span>'+cqt.criteriaLabel+'</li>';
                }
                this.newItemTITLEReject(mtec);
            }
            console.log("Updated mtct", mtct);
        }

        return this.newDebugItemTITLE(mtec, prefix+(result?"MATCH":"REJECT")+" ; Expression: "+criteria+" (item.value.code=\""+item.value.code+"\")",
            result
                ? [{"name":"color","value":"darkgreen"}]
                : [{"name":"color","value":"red"}]
        );
    }
    
    public newItemTITLECriteriaExpression(mtec: MatchResultEnrichContext) : any {
        const mr = mtec.mr;
        const item = mtec.item;
        const cqt = mtec.cqt;
        const ctrId = cqt.clinicalTrial.id;
        const prefix = cqt.clinicalTrial.name+" "+cqt.clinicalTrial.nctNumber+" CRITERIA ";
        let criteria = cqt.criteria; // already checked that it is defined
        const origCriteria = cqt.criteria; // immutable
        const AGE="age";
        if (criteria.includes(AGE) && item.dataType=="DT") {
            if (!item.value) {
                return this.newDebugItemTITLE(mtec, prefix+" SKIPPED: NO ANSWER"+" ; (MATCH Definition: "+origCriteria+")");
            }
            if (!/^(\d){4}-(\d){2}-(\d){2}$/.test(item.value)) {
                return this.newDebugItemTITLE(mtec, prefix+" INTERNAL ERROR date not in format yyyy-mm-dd in '"+item.value+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")");
            }
            const y = item.value.substr(0,4);
            const m = item.value.substr(5,2) - 1;
            const d = item.value.substr(8,2);
            const dValue = new Date(y,m,d);
            if (dValue.getFullYear() != y && dValue.getMonth() != m && dValue.getDate() != d) {
               return this.newDebugItemTITLE(mtec, prefix+"INTERNAL ERROR date not valid in format yyyy-mm-dd in '"+item.value+"' ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")");
            }
            if (!mr.dsuData) {
               return this.newDebugItemTITLE(mtec, prefix+"INTERNAL ERROR MatchRequest.dsuData missing! Cannot evaluate! (MATCH Definition: "+origCriteria+")");
            }
            if (!mr.dsuData.submittedOn) {
               return this.newDebugItemTITLE(mtec, prefix+"INTERNAL ERROR MatchRequest.dsuData.submittedOn is '"+mr.dsuData.submittedOn+"' unparseable as Date! Cannot evaluate! (MATCH Definition: "+origCriteria+")");
            }
            let aNowDate = Date.parse(mr.dsuData.submittedOn);
            if (!aNowDate) {
               return this.newDebugItemTITLE(mtec, prefix+"INTERNAL ERROR MatchRequest.dsuData.submittedOn is '"+mr.dsuData.submittedOn+"' unparseable as Date! Cannot evaluate! (MATCH Definition: "+origCriteria+")");
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
                return this.newDebugItemTITLE(mtec, prefix+"SKIPPED: NO ANSWER"+" ; (MATCH Definition: "+origCriteria+")");
            }
            while (criteria.includes(CODE)) {
                criteria = criteria.replace(CODE, JSON.stringify(item.value.code));
            }
        }
        const QTY="qty";
        if (criteria.includes(QTY)) {
            // replace code with value
            if (!item.value) {
                return this.newDebugItemTITLE(mtec, prefix+"SKIPPED: NO ANSWER"+" ; (MATCH Definition: "+origCriteria+")");
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
                return this.newDebugItemTITLE(mtec, prefix+"SKIPPED: value absent or not array"+" ; (MATCH Definition: "+origCriteria+")");
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
            return this.newDebugItemTITLE(mtec, prefix+"INTERNAL ERROR "+error+" ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")");
        }
        
        // increment the counts
        const mt = mr.matchResult;
        if (mt) {
            let trials : MatchResultClinicalTrial[] = mt.dsuData.trials;
            if (!trials) {
                return this.newDebugItemTITLE(mtec, prefix+"INTERNAL ERROR MatchRequest.matchResult.trials is undefined");
            }
            let mtct : MatchResultClinicalTrial = trials.find( (mtct) => { return mtct.clinicalTrial && mtct.clinicalTrial.id === ctrId });
            if (!mtct) {
                return this.newDebugItemTITLE(mtec, prefix+"INTERNAL ERROR MatchRequest.matchResult.trials[clinicalTrial.id="+ctrId+"] not found!");
            }
            mtct.criteriaCount++;
            if (result) {
                mtct.criteriaMatchedCount++;
                mtct.criteriaConfidenceCount++; // expressions are always decisive
                if (cqt.criteriaLabel) { // only explain to the patient if there is a defined criteriaLabel
                    mtct.criteriaExplained += '<li><span class="match-img"></span>'+cqt.criteriaLabel+'</li>';
                }
                this.newItemTITLEMatchWithConfidence(mtec);
            } else {
                if (cqt.criteriaLabel) { // only explain to the patient if there is a defined criteriaLabel
                    mtct.criteriaExplained += '<li><span class="reject-img"></span>'+cqt.criteriaLabel+'</li>';
                }
                this.newItemTITLEReject(mtec);
            }
            console.log("Updated mtct", mtct);
        }

        return this.newDebugItemTITLE(mtec, prefix+(result?"MATCH":"REJECT")+" ; Expression: "+criteria+" (MATCH Definition: "+origCriteria+")",
            result
                ? [{"name":"color","value":"darkgreen"}]
                : [{"name":"color","value":"red"}]
        );
    };

}