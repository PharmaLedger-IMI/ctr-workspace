
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class ClinicalTrialService {
    constructor(
        private connection: Connection,
    ) { }

    /**
     * 
     * @param id Ctr.id
     * @returns an arry to be used as items
     */
    getLFormConditionItems(id: string) : any {
        return null;
    }
}
