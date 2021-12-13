import { ClinicalTrialQuestionType } from "./clinicaltrialquestiontype.entity";
import { MatchRequest } from "./matchrequest.entity";

/**
 * A context used while explaining the match criteria for one specific question.
 */
export class MatchResultEnrichContext {

    mr: MatchRequest;

    item: any; // LHC-Form question item being enriched

    cqt: ClinicalTrialQuestionType;

    items: any[]; // Array of items do display TITLE fields

    constructor(mr: MatchRequest, item: any, cqt: ClinicalTrialQuestionType) {
        this.mr   = mr;
        this.item = item;
        this.cqt  = cqt;
        this.items = [];
    }
}
