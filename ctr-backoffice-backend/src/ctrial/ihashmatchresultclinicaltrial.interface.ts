import { MatchResultClinicalTrial } from "./matchresultclinicaltrial.dto";

// the index is a string with ctrId. The indexed object is a MatchResultClinicalTrial
export interface IHashMatchResultClinicalTrial {
    [ctrId: string] : MatchResultClinicalTrial;
}
