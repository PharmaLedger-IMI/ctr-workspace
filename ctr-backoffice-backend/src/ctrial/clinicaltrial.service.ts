
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LFormsService } from 'src/lforms/lforms.service';
import { Connection } from 'typeorm';
import { ClinicalTrialQuestionType } from './clinicaltrialquastiontype.entity';
import { QuestionType } from './questiontype.entity';

@Injectable()
export class ClinicalTrialService {
    constructor(
        private connection: Connection,
        private lfService: LFormsService
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
            .select("Cqt")
            .from(ClinicalTrialQuestionType, "Cqt")
            .leftJoinAndSelect("Cqt.questionType", "Qt")
            .leftJoinAndSelect("Qt.dataType", "Qdt")
            .where("Cqt.stage=30")
            .andWhere("Cqt.clinicaltrial=:ctrId", {ctrId: ctrId})
            .orderBy("Cqt.stage", "ASC")
            .orderBy("Cqt.ordering", "ASC");
        console.log(q.getSql());
        const ctrqtCollectionPromise = q.getMany();
        const ctrqtCollection = await ctrqtCollectionPromise;
        ctrqtCollection.forEach( (cqt) => {
            const newItem = self.lfService.cqt2Item(cqt);
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
            .select("Cqt")
            .from(ClinicalTrialQuestionType, "Cqt")
            .leftJoinAndSelect("Cqt.questionType", "Qt")
            .leftJoinAndSelect("Qt.dataType", "Qdt")
            .where("Cqt.stage=40")
            .andWhere("Cqt.clinicaltrial=:ctrId", {ctrId: ctrId})
            .orderBy("Cqt.stage", "ASC")
            .orderBy("Cqt.ordering", "ASC");
        console.log(q.getSql());
        const ctrqtCollectionPromise = q.getMany();
        const ctrqtCollection = await ctrqtCollectionPromise;
        ctrqtCollection.forEach((cqt) => {
            const newItem = self.lfService.cqt2Item(cqt);
            items.push(newItem);
        });
        return items;
    }
    
}
