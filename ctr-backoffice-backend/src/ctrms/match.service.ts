import { Connection } from "typeorm";
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import * as FORM_DEF_CONDITION from '../formDefs/condition.json';
import * as FORM_DEF_TRIAL from '../formDefs/trial.json';
import { ClinicalTrialRepository } from "src/ctrial/clinicaltrial.repository";
import { ClinicalTrialQuery } from "src/ctrial/clinicaltrialquery.validator";
import { ClinicalTrialStatusCodes } from "src/ctrial/clinicaltrialstatus.entity";
import { ClinicalTrialService } from "src/ctrial/clinicaltrial.service";
import { Location } from '../ctrial/location.entity';
import { MatchRequest } from '../ctrial/matchrequest.entity';
import { MatchRequestService } from "src/ctrial/matchrequest.service";
import { LFormsService } from "src/lforms/lforms.service";
import { ClinicalTrialQuestionType } from "src/ctrial/clinicaltrialquestiontype.entity";
import { PaginatedDto } from "src/paginated.dto";
import { ClinicalTrial } from "src/ctrial/clinicaltrial.entity";

@Injectable()
export class MatchService {
    constructor(
        private connection: Connection,
        private ctrRepository: ClinicalTrialRepository,
        private ctrService: ClinicalTrialService,
        private lformsService: LFormsService,
        private mrService: MatchRequestService
    ) { }

    async trialFind(reqBody: any): Promise<PaginatedDto<ClinicalTrialQuery,ClinicalTrial>> {
        const self = this;
        const ctrQuery = new ClinicalTrialQuery();
        ctrQuery.limit = 10;
        const page = await this.ctrRepository.search(ctrQuery);
        return page;
    }

    async trialPrefs(reqBody: any): Promise<any> {
        const self = this;

        const ctrQuery = new ClinicalTrialQuery();
        const medicalConditionName = this.mrService.getMedicalConditionName(reqBody);
        if (!medicalConditionName) {
            return {
                trialPrefsError: "Medical condition must be specified!",
                trialPrefsWarning: undefined,
                conditionBlank: undefined,
                trialBlank: undefined,
                trials: []
            };
        }
        ctrQuery.medicalConditionCode = this.mrService.getMedicalConditionCode(reqBody);
        if (medicalConditionName && !ctrQuery.medicalConditionCode) {
            return {
                trialPrefsError: "Unknown medical condition '"+medicalConditionName+"'!",
                trialPrefsWarning: undefined,
                conditionBlank: undefined,
                trialBlank: undefined,
                trials: []
            };
        }
        ctrQuery.status = ClinicalTrialStatusCodes.RECRUITMENT;
        const locCode = this.mrService.getLocCodeFromTrialPrefs(reqBody);
        const locDescription = this.mrService.getLocDescriptionFromTrialPrefs(reqBody);
        if (locCode) {
            const locRepository = this.connection.getRepository(Location);
            const loc = await locRepository.findOne(locCode);
            if (!loc) {
                throw new InternalServerErrorException('reqBody.trialPrefs.items[(@.localQuestionCode=="location")].value.code==="'+locCode+'" not found in database!');
            }
            ctrQuery.latitude = loc.latitude;
            ctrQuery.longitude = loc.longitude;
            ctrQuery.travelDistance = this.mrService.getTravelDistanceFromTrialPrefs(reqBody);
        }
        let trialPrefsWarning = '';
        if (locDescription && !locCode) {
            trialPrefsWarning += "Location description is not known. Ignoring location.";
        }
        ctrQuery.limit = 1;
        const ctrCollectionPr = await this.ctrRepository.search(ctrQuery);
        const ctrCollection = await ctrCollectionPr;
        let ctrIdCollection = [];
        ctrCollection.results.forEach((ctr) => {
            ctrIdCollection.push(ctr.id);
        });
        console.log("ctrIds", ctrIdCollection);

        if (ctrIdCollection.length == 0) {
            // throw new InternalServerErrorException('No matched trials');
            return {
                trialPrefsError: "No matched trials!",
                trialPrefsWarning: trialPrefsWarning,
                conditionBlank: undefined,
                trialBlank: undefined,
                trials: []
            };
        }

        // TODO merge multiple trials
        const lastCtrId = ctrIdCollection[0];
        const lastCtr = ctrCollection.results[0];
        
        const conditionItemsPromise = await self.ctrService.getLFormConditionItems(lastCtrId);
        const conditionFormDef = this.lformsService.getConditionTemplate();
        if (conditionItemsPromise) {
            const conditionItems = await conditionItemsPromise;
            conditionFormDef.items = conditionItems;
        }

        const trialItemsPromise = await self.ctrService.getLFormTrialItems(lastCtrId);
        const trialFormDef = this.lformsService.getTrialTemplate();
        if (trialItemsPromise) {
            const trialItems = await trialItemsPromise;
            trialFormDef.items = trialItems;
        }

        // TODO merge condition forms and trial forms

        return {
            trialPrefsError: undefined,
            trialPrefsWarning: trialPrefsWarning,
            conditionBlank: conditionFormDef,
            trialBlank: trialFormDef,
            trials: [lastCtr]
        };
    }

    async submit(reqBody: any): Promise<any> {
        if (!reqBody.constKeySSIStr) {
            throw new InternalServerErrorException('Missing constKeySSIStr property!');
        }
        // TODO check constKeySSIStr
        const mr = new MatchRequest();
        mr.keyssi = reqBody.constKeySSIStr;
        mr.dsuData = reqBody;
        
        const mrRepository = this.connection.getRepository(MatchRequest);
        await mrRepository.save(mr);
        console.log("saved", mr);
        
        return { prop: "test" };
    }

}
