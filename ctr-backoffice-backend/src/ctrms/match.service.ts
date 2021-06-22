import { Connection } from "typeorm";
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MatchRequest } from '../ctrial/matchrequest.entity';

import * as FORM_DEF_CONDITION from '../formDefs/condition.json';
import * as FORM_DEF_TRIAL from '../formDefs/trial.json';

@Injectable()
export class MatchService {
    constructor(
        private connection: Connection
    ) { }

    async trialPrefs(reqBody: any): Promise<any> {
        if (!reqBody) {
            throw new HttpException('Missing xxx property!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // TODO check constKeySSIStr
        const mr = new MatchRequest();
        mr.keyssi = reqBody.constKeySSIStr;
        mr.dsuData = reqBody;
        
        return {
            conditionBlank: FORM_DEF_CONDITION,
            trialBlank: FORM_DEF_TRIAL
        };
    }

    async submit(reqBody: any): Promise<any> {
        if (!reqBody.constKeySSIStr) {
            throw new HttpException('Missing constKeySSIStr property!', HttpStatus.INTERNAL_SERVER_ERROR);
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
