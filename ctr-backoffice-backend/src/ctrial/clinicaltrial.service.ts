
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { LFormsService } from '../lforms/lforms.service';
import { ClinicalTrialQuestionType } from './clinicaltrialquestiontype.entity';
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
     * @returns an array to be used as items. Items are enriched with ctrExtension.
     */
    async getLFormConditionItems(ctrIdCollection: string[]) : Promise<any> {
        const self = this;
        const q = this.connection
            .createQueryBuilder()
            .select("Cqt")
            .from(ClinicalTrialQuestionType, "Cqt")
            .leftJoinAndSelect("Cqt.clinicalTrial", "Ctr") // init basic ClinicalTrial info
            .leftJoinAndSelect("Cqt.questionType", "Qt")
            .leftJoinAndSelect("Qt.dataType", "Qdt")
            .where("Cqt.stage=30")
            .andWhere("Cqt.clinicaltrial IN (:...ctrIdCollection)", {ctrIdCollection: ctrIdCollection})
            .orderBy("Cqt.stage", "ASC")
            .orderBy("Cqt.ordering", "ASC");
        console.log(q.getSql());
        const cqtCollectionPromise = q.getMany();
        const cqtCollection = await cqtCollectionPromise;
        return self.mergeItems(cqtCollection);
    }

    /**
     * Get the ClinicalTrialQuestionType[] for the general health information to one particular trial.
     * @param ctrId Ctr.id
     * @returns an array to be used as items
     */
    async getLFormGeneralHealthInfo(ctrId: string) : Promise<ClinicalTrialQuestionType[]> {
        const self = this;
        const items = [];
        const q = this.connection
            .createQueryBuilder()
            .select("Cqt")
            .from(ClinicalTrialQuestionType, "Cqt")
            .leftJoinAndSelect("Cqt.clinicalTrial", "Ctr") // init basic ClinicalTrial info
            .leftJoinAndSelect("Cqt.questionType", "Qt")
            .leftJoinAndSelect("Qt.dataType", "Qdt")
            .where("Cqt.stage=10")
            .andWhere("Cqt.clinicaltrial=:ctrId", {ctrId: ctrId})
            .orderBy("Cqt.stage", "ASC")
            .orderBy("Cqt.ordering", "ASC");
        console.log(q.getSql());
        return q.getMany();
    }

    /**
     * Get the items for the condition specific answer to one particular trial.
     * @param ctrId Ctr.id
     * @returns an array to be used as items
     */
    async getLFormTrialItems(ctrId: string): Promise<any> {
        const self = this;
        const q = this.connection
            .createQueryBuilder()
            .select("Cqt")
            .from(ClinicalTrialQuestionType, "Cqt")
            .leftJoinAndSelect("Cqt.clinicalTrial", "Ctr") // init basic ClinicalTrial info
            .leftJoinAndSelect("Cqt.questionType", "Qt")
            .leftJoinAndSelect("Qt.dataType", "Qdt")
            .where("Cqt.stage=40")
            .andWhere("Cqt.clinicaltrial=:ctrId", {ctrId: ctrId})
            .orderBy("Cqt.stage", "ASC")
            .orderBy("Cqt.ordering", "ASC");
        console.log(q.getSql());
        const cqtCollectionPromise = q.getMany();
        const cqtCollection = await cqtCollectionPromise;
        return self.mergeItems(cqtCollection);
    }
    
    
    /**
     * Merge items by localQuestionCode.
     * @param 
     * @returns an array to be used as items. Items are enriched with ctrExtension.
     */
    mergeItems(cqtCollection: ClinicalTrialQuestionType[]) : any[] {
        const self = this;
        const items = [];
        const itemsByCode = {};
        for(let i=0; i<cqtCollection.length; i++) {
            const cqt = cqtCollection[i];
            const newItem = self.lfService.cqt2Item(cqt);
            if (itemsByCode.hasOwnProperty(cqt.questionType.localQuestionCode)) {
                // question already exists - keep old item, add cqt
                const oldItem = itemsByCode[cqt.questionType.localQuestionCode];
                oldItem['ctrExtension']['cqtIdCollection'].push(cqt.id);
            } else {
                // new question
                itemsByCode[cqt.questionType.localQuestionCode] = newItem;
                items.push(newItem);
            }
        };
        return items;
    }

}
