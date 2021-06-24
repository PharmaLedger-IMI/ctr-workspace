
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class MatchRequestService {
    constructor(
        private connection: Connection,
    ) { }


    /**
    * Get the medical condition LForms item object
    * @returns an object
    * @throws InternalServerErrorException if improper data.
    */
    getMedicalCondition(dsuData: any) : any {
        let result = '';
        if (!dsuData.trialPrefs
            || !dsuData.trialPrefs.items
            || !Array.isArray(dsuData.trialPrefs.items)) {
            throw new InternalServerErrorException('No medical condition question on trialPrefs');
        }
        const itemCondition = dsuData.trialPrefs.items.find((item) => {
            return item.localQuestionCode && item.localQuestionCode === 'condition';
        });
        if (!itemCondition) {
            throw new InternalServerErrorException("No localQuestionCode==='condition' on trialPrefs");
        }
        if (itemCondition.dataType !== 'CWE') {
            throw new InternalServerErrorException("localQuestionCode==='condition' expected type CWE on trialPrefs");
        }
        if (!itemCondition.value) {
            throw new InternalServerErrorException("No localQuestionCode==='condition' has no answer value on trialPrefs");
        }
        return itemCondition;
    }

    /**
     * Get the medical condition code as a string.
     * @returns a string with the medical condition code.
     * @throws InternalServerErrorException if improper data.
     */
    getMedicalConditionCode(dsuData: any) : string {
        const itemCondition = this.getMedicalCondition(dsuData);
        if (!itemCondition.value) {
            throw new InternalServerErrorException("No localQuestionCode==='condition' has no answer value on trialPrefs");
        }
        if (!itemCondition.value.code) {
            throw new InternalServerErrorException("No localQuestionCode==='condition' has no answer value.code on trialPrefs");
        }
        return itemCondition.value.code;
    }
}
