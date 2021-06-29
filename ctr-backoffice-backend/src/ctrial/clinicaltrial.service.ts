
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LFormsService } from 'src/lforms/lforms.service';
import { Connection } from 'typeorm';
import { ClinicalTrialQuestionType } from './clinicaltrialquastiontype.entity';
import { QuestionType } from './questiontype.entity';

@Injectable()
export class ClinicalTrialService {
    constructor(
        private connection: Connection,
        private lformsService: LFormsService
    ) { }

    /**
     * 
     * @param id Ctr.id
     * @returns an arry to be used as items
     */
    async getLFormConditionItems(id: string) : Promise<any> {
        const self = this;
        const items = [];
        const q = this.connection
            .createQueryBuilder()
            .select("Ctrqt")
            .from(ClinicalTrialQuestionType, "Ctrqt")
            .leftJoinAndSelect("Ctrqt.questionType", "Qt")
            .leftJoinAndSelect("Qt.dataType", "Qdt")
            .orderBy("Ctrqt.stage", "ASC")
            .orderBy("Ctrqt.ordering", "ASC");
        const ctrqtCollectionPromise = q.getMany();
        const ctrqtCollection = await ctrqtCollectionPromise;
        ctrqtCollection.forEach( (item) => {
            const newItem = self.lformsService.qt2Item(item.questionType);
            items.push(newItem);
        });
        return items;
    }
}
