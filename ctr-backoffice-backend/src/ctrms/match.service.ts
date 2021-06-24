import { Connection } from "typeorm";
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { MatchRequest } from '../ctrial/matchrequest.entity';

import * as FORM_DEF_CONDITION from '../formDefs/condition.json';
import * as FORM_DEF_TRIAL from '../formDefs/trial.json';
import { ClinicalTrialRepository } from "src/ctrial/clinicaltrial.repository";
import { ClinicalTrialQuery } from "src/ctrial/clinicaltrialquery.validator";
import { MatchRequestService } from "src/ctrial/matchrequest.service";
import { ClinicalTrialStatusCodes } from "src/ctrial/clinicaltrialstatus.entity";

@Injectable()
export class MatchService {
    constructor(
        private connection: Connection,
        private mrService: MatchRequestService,
        private ctrRepository: ClinicalTrialRepository
    ) { }

    async trialPrefs(reqBody: any): Promise<any> {
        if (!reqBody) {
            throw new InternalServerErrorException('Missing reqBody!');
        }

        const ctrQuery = new ClinicalTrialQuery();
        ctrQuery.medicalConditionCode = this.mrService.getMedicalConditionCode(reqBody);
        ctrQuery.status = ClinicalTrialStatusCodes.RECRUITMENT;
        ctrQuery.limit = 100;
        const ctrCollectionPr = await this.ctrRepository.search(ctrQuery);
        const ctrCollection = await ctrCollectionPr;
        console.log("Search done", ctrCollection);

        // TODO merge condition forms and trial forms
        
        return {
            conditionBlank: FORM_DEF_CONDITION,
            trialBlank: FORM_DEF_TRIAL
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
