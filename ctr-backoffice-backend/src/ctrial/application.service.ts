
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { Application } from './application.entity';
import { LFormsService } from '../lforms/lforms.service';
import { MatchResultClinicalTrial } from "./matchresultclinicaltrial.dto";
import { MatchRequest } from "./matchrequest.entity";

@Injectable()
export class ApplicationService {
    constructor(
        private connection: Connection
    ) { }

    /**
     * Create (INSERT) a new Application from DTO JSON data in a single transaction.
     * @param appDto data to be inserted, from JSON. Will be mutated by adding PKs and internal FKs.
     */
    async create(appDto: any) : Promise<Application> {
        const self = this;
        let app = undefined;
        await this.connection.transaction(async tem => {
            app = await self.createT(tem, appDto);
        });
        return app;
    }

    /**
     * Create (INSERT) a new Application from DTO JSON data, given a transactional entity manager.
     * @param tem Transactional EntityManager
     * @param appDto data to be inserted, from JSON. Will be mutated by adding PKs and internal FKs.
     */
    async createT(tem: EntityManager, appDto: any) : Promise<Application> {
        return await tem.save(Application, appDto);
    }

}

