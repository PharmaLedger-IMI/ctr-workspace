
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LFormsService } from 'src/lforms/lforms.service';
import { Connection } from 'typeorm';
import { MatchRequest } from './matchrequest.entity';

@Injectable()
export class MatchRequestService {
    constructor(
        private connection: Connection,
        private lfService: LFormsService
    ) { }

    /**
     * Enrich the forms of a MatchRequest with information of criteria.
     * For each question that has creteria filled in, append a title form
     * entry with the description of that criteria.
     * @param mr 
     */
    enrichFormsWithCriteria(mr : MatchRequest) : MatchRequest {
        const dsuData = mr.dsuData; // the dsuData is what is submitted in the body of /borest/ctrms/submit
        if (!dsuData) {
            throw new InternalServerErrorException('Missing dsuData on MatchRequest.keyssi='+mr.keyssi);
        }
        const ghiForm = dsuData.ghiForm;
        const trialPrefs = dsuData.trialForms;
        const condition = dsuData.condition;
        const trial = dsuData.trial;

        if (condition) {
            this.lfService.enrichWithCriteria(condition);
        }

        return mr;
    }

    /**
     * Get the location question JSON object from a JSON that contains a trialPrefs form.
     * @param reqBody must contain an trialPrefs property.
     */
    getLocationQuestionFromTrialPrefs(reqBody: any) : any {
        if (!reqBody) {
            throw new InternalServerErrorException('Missing reqBody!');
        }
        if (!reqBody.trialPrefs) {
            throw new InternalServerErrorException('Missing reqBody.trialPrefs!');
        }
        if (!reqBody.trialPrefs.items) {
            throw new InternalServerErrorException('Missing reqBody.trialPrefs.items!');
        }
        if (!Array.isArray(reqBody.trialPrefs.items)) {
            throw new InternalServerErrorException('reqBody.trialPrefs.items is not an Array!');
        }
        const locationQuestion = reqBody.trialPrefs.items.find( (question) => {
            return question && question.localQuestionCode==='location'
        });
        if (!locationQuestion) {
            throw new InternalServerErrorException('reqBody.trialPrefs.items[*] does not contain a localQuestionCode="location"!');
        }
        return locationQuestion;
    }

    /**
     * Get the Loc.code from a JSON that contains a trialPrefs form.
     * @param reqBody must contain an trialPrefs property.
     * @returns The string with the Loc.code. May be undefined.
     */
    getLocCodeFromTrialPrefs(reqBody: any) : string | undefined {
        const locationQuestion = this.getLocationQuestionFromTrialPrefs(reqBody);
        if (!locationQuestion.value) {
            throw new InternalServerErrorException('reqBody.trialPrefs.items[(@.localQuestionCode=="location")] has no value property!');
        }
        return locationQuestion.value.code;
    }

    /**
     * Get the location description from a JSON that contains a trialPrefs form.
     * @param reqBody must contain an trialPrefs property.
     * @returns The string with the Loc.description or free text. May be undefined.
     */
    getLocDescriptionFromTrialPrefs(reqBody: any) : string | undefined {
        const locationQuestion = this.getLocationQuestionFromTrialPrefs(reqBody);
        if (!locationQuestion.value) {
            throw new InternalServerErrorException('reqBody.trialPrefs.items[(@.localQuestionCode=="location")] has no value property!');
        }
        return locationQuestion.value.text;
    }

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
     * @returns a string with the medical condition code. undefined if it does not exist.
     * @throws InternalServerErrorException if improper data.
     */
    getMedicalConditionCode(dsuData: any) : string {
        const itemCondition = this.getMedicalCondition(dsuData);
        if (!itemCondition.value) {
            throw new InternalServerErrorException("No localQuestionCode==='condition' has no answer value on trialPrefs");
        }
        if (!itemCondition.value.code) {
            return undefined;
        }
        return itemCondition.value.code;
    }

    /**
     * Get the medical condition name as a string.
     * @returns a string with the medical condition name. undefined if empty.
     * @throws InternalServerErrorException if improper data.
     */
    getMedicalConditionName(dsuData: any) : string {
        const itemCondition = this.getMedicalCondition(dsuData);
        if (!itemCondition.value) {
            throw new InternalServerErrorException("No localQuestionCode==='condition' has no answer value on trialPrefs");
        }
        if (!itemCondition.value.text) {
            return undefined;
        }
        return itemCondition.value.text;
    }

    /**
     * Get the travel distance question JSON object from a JSON that contains a trialPrefs form.
     * @param reqBody must contain an trialPrefs property.
     */
     getTravelDistanceQuestionFromTrialPrefs(reqBody: any) : any {
        if (!reqBody) {
            throw new InternalServerErrorException('Missing reqBody!');
        }
        if (!reqBody.trialPrefs) {
            throw new InternalServerErrorException('Missing reqBody.trialPrefs!');
        }
        if (!reqBody.trialPrefs.items) {
            throw new InternalServerErrorException('Missing reqBody.trialPrefs.items!');
        }
        if (!Array.isArray(reqBody.trialPrefs.items)) {
            throw new InternalServerErrorException('reqBody.trialPrefs.items is not an Array!');
        }
        const travelDistanceQuestion = reqBody.trialPrefs.items.find( (question) => {
            return question && question.localQuestionCode==='travelDistance'
        });
        if (!travelDistanceQuestion) {
            throw new InternalServerErrorException('reqBody.trialPrefs.items[*] does not contain a localQuestionCode="travelDistance"!');
        }
        return travelDistanceQuestion;
    }

    /**
     * Get the travel distance in miles.
     * @param reqBody must contain an trialPrefs property.
     * @returns {number} travel distance in miles. Undefined if not present.
     */
     getTravelDistanceFromTrialPrefs(reqBody: any) : any {
        const travelDistanceQuestion = this.getTravelDistanceQuestionFromTrialPrefs(reqBody);
        if (!travelDistanceQuestion.value) {
            return undefined;
        }
        if (travelDistanceQuestion.unit) {
            if (travelDistanceQuestion.unit.name === "km")
                return travelDistanceQuestion.value * 0.621371;
            if (travelDistanceQuestion.unit.name !== "[mi_i]" && travelDistanceQuestion.unit.name !== "mi")
                throw new InternalServerErrorException('reqBody.trialPrefs.items[(@.localQuestionCode=="travelDistance")].unit.name must be "km" or "[mi_i]"!');
        }
        return travelDistanceQuestion.value;
    }
}
