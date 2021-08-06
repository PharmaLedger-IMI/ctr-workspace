
export class MatchResultClinicalTrial {

    clinicalTrial: any; // relaxed version of clinicaltrial.entity which must
        // contain all the information needed for the user to display
        // the MatchRequest+MatchResult

    criteriaCount: number = 0; // total count of criteria evaluated for this trial
    
    criteriaMatchedCount: number = 0; // total count of criteria matched/pass for this trial

    criteriaConfidenceCount: number = 0; // total count of criteria that is relevant for the match confidence %
    
    constructor(ctr: any) {
        this.clinicalTrial = ctr;
    }
}
