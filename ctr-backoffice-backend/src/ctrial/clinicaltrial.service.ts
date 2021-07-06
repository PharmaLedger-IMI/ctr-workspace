
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
     * Get the items for the condition specific answer to one particular trial.
     * @param ctrId Ctr.id
     * @returns an array to be used as items
     */
    async getLFormConditionItems(ctrId: string) : Promise<any> {
        const self = this;
        const items = [];
        const q = this.connection
            .createQueryBuilder()
            .select("Ctrqt")
            .from(ClinicalTrialQuestionType, "Ctrqt")
            .leftJoinAndSelect("Ctrqt.questionType", "Qt")
            .leftJoinAndSelect("Qt.dataType", "Qdt")
            .where("Ctrqt.stage=30")
            .andWhere("Ctrqt.clinicaltrial=:ctrId", {ctrId: ctrId})
            .orderBy("Ctrqt.stage", "ASC")
            .orderBy("Ctrqt.ordering", "ASC");
        console.log(q.getSql());
        const ctrqtCollectionPromise = q.getMany();
        const ctrqtCollection = await ctrqtCollectionPromise;
        ctrqtCollection.forEach( (item) => {
            const newItem = self.lformsService.qt2Item(item.questionType);
            items.push(newItem);
        });
        return items;
    }

    /**
     * Get the items for the condition specific answer to one particular trial.
     * @param ctrId Ctr.id
     * @returns an array to be used as items
     */
    async getLFormTrialItems(ctrId: string): Promise<any> {
        const self = this;
        const items = [];
        const q = this.connection
            .createQueryBuilder()
            .select("Ctrqt")
            .from(ClinicalTrialQuestionType, "Ctrqt")
            .leftJoinAndSelect("Ctrqt.questionType", "Qt")
            .leftJoinAndSelect("Qt.dataType", "Qdt")
            .where("Ctrqt.stage=40")
            .andWhere("Ctrqt.clinicaltrial=:ctrId", {ctrId: ctrId})
            .orderBy("Ctrqt.stage", "ASC")
            .orderBy("Ctrqt.ordering", "ASC");
        console.log(q.getSql());
        const ctrqtCollectionPromise = q.getMany();
        const ctrqtCollection = await ctrqtCollectionPromise;
        ctrqtCollection.forEach((item) => {
            const newItem = self.lformsService.qt2Item(item.questionType);
            items.push(newItem);
        });
        return items;
    }
    
}
