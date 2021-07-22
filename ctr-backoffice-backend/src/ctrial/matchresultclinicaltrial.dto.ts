
export class MatchResultClinicalTrial {

    clinicalTrial: any; // relaxed version of clinicaltrial.entity which must
        // contain all the information needed for the user to display
        // the MatchRequest+MatchResult

    criteriaCount: number = 0; // total count of criteria evaluated for this trial

    criteriaMatchedCount: number = 0; // total count of criteria matched/pass for this trial
    
    constructor(ctr: any) {
        this.clinicalTrial = ctr;
    }
}
