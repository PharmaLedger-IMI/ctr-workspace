import { v4 as uuidv4 } from 'uuid';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { QuestionType } from './questiontype.entity';

@Injectable()
export class QuestionTypeService {
    constructor(
        private connection: Connection
    ) { }

    /**
     * Create (INSERT) a new QuestionType from DTO JSON data in a single transaction.
     * @param qtDto data to be inserted, from JSON. Will be mutated by adding PKs and internal FKs.
     */
     async create(qtDto: any) {
        const self = this;
        await this.connection.transaction(async tem => {
            await self.createT(tem, qtDto);
        });
    }

    /**
     * Create (INSERT) a new QuestionType from DTO JSON data, given a transactional entity manager.
     * @param tem Transactional EntityManager
     * @param qtDto data to be inserted, from JSON. Will be mutated by adding PKs and internal FKs.
     */
    async createT(tem: EntityManager, qtDto: any) {
        if (!qtDto.localQuestionCode) {
            qtDto.localQuestionCode = uuidv4(); // TODO server should always assign questionCode.
        }
        await tem.insert(QuestionType, qtDto); 
    }
}
