import { Connection } from "typeorm";
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import * as FORM_DEF_CONDITION from '../formDefs/condition.json';
import * as FORM_DEF_TRIAL from '../formDefs/trial.json';
import { ClinicalTrialRepository } from "src/ctrial/clinicaltrial.repository";
import { ClinicalTrialQuery } from "src/ctrial/clinicaltrialquery.validator";
import { ClinicalTrialStatusCodes } from "src/ctrial/clinicaltrialstatus.entity";
import { ClinicalTrialService } from "src/ctrial/clinicaltrial.service";
import { MatchRequest } from '../ctrial/matchrequest.entity';
import { MatchRequestService } from "src/ctrial/matchrequest.service";
import { LFormsService } from "src/lforms/lforms.service";

@Injectable()
export class MatchService {
    constructor(
        private connection: Connection,
        private ctrRepository: ClinicalTrialRepository,
        private ctrService: ClinicalTrialService,
        private lformsService: LFormsService,
        private mrService: MatchRequestService
    ) { }

    async trialPrefs(reqBody: any): Promise<any> {
        const self = this;
        if (!reqBody) {
            throw new InternalServerErrorException('Missing reqBody!');
        }

        const ctrQuery = new ClinicalTrialQuery();
        ctrQuery.medicalConditionCode = this.mrService.getMedicalConditionCode(reqBody);
        ctrQuery.status = ClinicalTrialStatusCodes.RECRUITMENT;
        ctrQuery.limit = 100;
        const ctrCollectionPr = await this.ctrRepository.search(ctrQuery);
        const ctrCollection = await ctrCollectionPr;
        let ctrIdCollection = [];
        ctrCollection.results.forEach(ctr => {
            ctrIdCollection.push(ctr.id);
        });
        console.log("ctrIds", ctrIdCollection);

        if (ctrIdCollection.length == 0) {
            // TODO no matched trials
            throw new InternalServerErrorException('No matched trials');
        }

        const lastCtrId = ctrIdCollection[0];
    
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
            conditionBlank: conditionFormDef,
            trialBlank: trialFormDef
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
