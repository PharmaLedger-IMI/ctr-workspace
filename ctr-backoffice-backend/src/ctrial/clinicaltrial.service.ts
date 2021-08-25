
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Connection, EntityManager, Transaction } from 'typeorm';
import { ClinicalTrial } from './clinicaltrial.entity';
import { ClinicalTrialMedicalCondition } from './clinicaltrialmedicalcondition.entity';
import { ClinicalTrialQuestionType } from './clinicaltrialquestiontype.entity';
import { GeneralHealthInformationQuestionType } from './generalhealthinformationquestiontype.entity';
import { LFormsService } from '../lforms/lforms.service';
import { MatchResultClinicalTrial } from "./matchresultclinicaltrial.dto";
import { MatchRequest } from "./matchrequest.entity";
import { QuestionType } from './questiontype.entity';
import { MedicalConditionQuestionType } from './medicalconditionquestiontype.entity';
import { setFlagsFromString } from 'v8';

@Injectable()
export class ClinicalTrialService {
    constructor(
        private connection: Connection,
        private lfService: LFormsService
    ) { }

    /**
     * Create (INSERT) a new ClinicalTrial from DTO JSON data in a single transaction.
     * @param ctrDto data to be inserted, from JSON. Will be mutated by adding PKs and internal FKs.
     */
    async create(ctrDto: any) {
        const self = this;
        await this.connection.transaction(async tem => {
            await self.createT(tem, ctrDto);
        });
    }

    /**
     * Create (INSERT) a new ClinicalTrial from DTO JSON data in a single transaction.
     * @param ctrDto data to be inserted, from JSON. Will be mutated by adding PKs and internal FKs.
     */
    async createFull(ctrDto: any) {
        const self = this;
        await this.connection.transaction(async tem => {
            await self.createT(tem, ctrDto);
            // TODO GHI, condition, and trial-specific
        });
    }

    /**
     * Create (INSERT) a new ClinicalTrial from DTO JSON data, given a transactional entity manager.
     * @param tem Transactional EntityManager
     * @param ctrDto data to be inserted, from JSON. Will be mutated by adding PKs and internal FKs.
     */
    async createT(tem: EntityManager, ctrDto: any) {
        await tem.insert(ClinicalTrial, ctrDto); // autocommit is good enough ?
        // TODO explicit save of Ctmc should not be needed!!!
        if (ctrDto.clinicalTrialMedicalConditions
            && Array.isArray(ctrDto.clinicalTrialMedicalConditions)
        ) {
            for (let i = 0; i < ctrDto.clinicalTrialMedicalConditions.length; i++) {
                const ctmc = ctrDto.clinicalTrialMedicalConditions[i];
                ctmc.clinicalTrial = ctrDto.id;
                await tem.insert(ClinicalTrialMedicalCondition, ctmc);
            }
        }
    }


    /**
     * For each item that has cqt.criteria, append a new item (question title item)
     * with the criteria evaluation results.
     * @param {MatchRequest} mr - MatchRequest object.
     * @param {object} lform - lform form object to be enriched. Needs only to be initialized with a JSON.parse
     * @param {object} itemsByCode - optional map of question items indexed by localQuestionCode.
     * If defined, overrides the ctrExtensions.ctqIdCollection.
     */
    async enrichWithCriteria(mr: MatchRequest, lform: any, itemsByCode?: any): Promise<void> {
        const self = this;

        const cqtRepository = this.connection.getRepository(ClinicalTrialQuestionType);

        const items = lform.items;
        if (!items) {
            throw new InternalServerErrorException('Missing items in form ' + JSON.stringify(lform));
        }
        if (!Array.isArray(items)) {
            throw new InternalServerErrorException('lform.items is not an Array in lform ' + JSON.stringify(lform));
        }
        const newItems = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let newItem = item;
            if (itemsByCode) {
                const overrideItem = itemsByCode[newItem.localQuestionCode];
                if (overrideItem) {
                    newItem.ctrExtension = overrideItem.ctrExtension;
                }
            }
            newItems.push(newItem);
            //console.log("oldItem", item, "newItem", newItem);
            if (newItem.ctrExtension
                && newItem.ctrExtension.cqtIdCollection
                && Array.isArray(newItem.ctrExtension.cqtIdCollection)
            ) {
                const cqtIdCollection = newItem.ctrExtension.cqtIdCollection;
                for (let j = 0; j < cqtIdCollection.length; j++) {
                    const cqtId = cqtIdCollection[j];
                    const cqt = await cqtRepository.findOneOrFail(cqtId);
                    if (cqt.criteria) {
                        newItems.push(self.lfService.newItemTITLECriteria(mr, item, cqt));
                    }
                }
            }
        }
        lform.items = JSON.parse(JSON.stringify(newItems)); // deep clone everything just in case
    }

    /**
     * Get the items for the condition specific answer to one particular trial.
     * @param {string[]} ctrIdCollection Array of Ctr.id
     * @returns an array to be used as items. Items are enriched with ctrExtension.
     */
    async getLFormConditionItems(ctrIdCollection: string[]): Promise<any> {
        const self = this;
        const cqtCollection = await this.getLFormConditionQuestionTypeArray(ctrIdCollection);
        return self.mergeItems(cqtCollection);
    }

    /**
     * Get the Cqt array of condition specific answer to a set of trials.
     * @param {string[]} ctrIdCollection Array of Ctr.id
     * @return an array of ClinicalTrialQuestionType sorted by ordering. May contain duplicated QuestionType.
     */
    protected async getLFormConditionQuestionTypeArray(ctrIdCollection: string[]): Promise<ClinicalTrialQuestionType[]> {
        const self = this;
        const q = this.connection
            .createQueryBuilder()
            .select("Cqt")
            .from(ClinicalTrialQuestionType, "Cqt")
            .leftJoinAndSelect("Cqt.clinicalTrial", "Ctr") // init basic ClinicalTrial info
            .leftJoinAndSelect("Cqt.questionType", "Qt")
            .leftJoinAndSelect("Qt.dataType", "Qdt")
            .where("Cqt.stage=30")
            .andWhere("Cqt.clinicaltrial IN (:...ctrIdCollection)", { ctrIdCollection: ctrIdCollection })
            .orderBy("Cqt.stage", "ASC")
            .addOrderBy("Cqt.ordering", "ASC")
            .addOrderBy("Cqt.id", "ASC"); // disambiguate state+ordering duplicates
        console.log(q.getSql());
        const cqtCollectionPromise = q.getMany();
        const cqtCollection = await cqtCollectionPromise;
        return cqtCollection;
    }
    /*
-- How to (re)build medicalconditionquestiontype from DB v0.6.5 ?

--SELECT * FROM medicalcondition ORDER BY code DESC;

DELETE FROM medicalconditionquestiontype WHERE medicalcondition=101000;
INSERT INTO medicalconditionquestiontype (
    id, ordering, questiontype, medicalcondition
)
SELECT uuid_generate_v4(),
       (SELECT MIN(Cqt2.ordering) FROM clinicaltrialquestiontype AS Cqt2 WHERE Cqt2.questionType=Cqt30.localquestioncode) AS ordering,
       Cqt30.localquestioncode,
       101000 -- Psoriatic Arthritis
FROM (
SELECT DISTINCT Cqt.questionType AS localQuestionCode
FROM clinicaltrialquestiontype Cqt,
     clinicaltrial Ct
WHERE Ct.id = Cqt.clinicaltrial
  AND Cqt.stage=30
  AND Ct.name LIKE 'Psoriatic Arthritis_'
) Cqt30
ORDER BY ordering;
COMMIT;

DELETE FROM medicalconditionquestiontype WHERE medicalcondition=100100;
INSERT INTO medicalconditionquestiontype (
    id, ordering, questiontype, medicalcondition
)
SELECT uuid_generate_v4(),
       (SELECT MIN(Cqt2.ordering) FROM clinicaltrialquestiontype AS Cqt2 WHERE Cqt2.questionType=Cqt30.localquestioncode) AS ordering,
       Cqt30.localquestioncode,
       100100 --  Ankylosing Spondylitis
FROM (
SELECT DISTINCT Cqt.questionType AS localQuestionCode
FROM clinicaltrialquestiontype Cqt,
     clinicaltrial Ct
WHERE Ct.id = Cqt.clinicaltrial
  AND Cqt.stage=30
  AND Ct.name LIKE 'CAIN457P12301%'
) Cqt30
ORDER BY ordering;
COMMIT;

     */

    /**
     * Get an array of QuestionType for the given trial, associated to the medical conditions
     * of the trial, sorted by the order to display. 
     * THIS IS ONLY EXPECTED TO WORK for the current version of MedicalConditionQuestionType.
     * May not not properly for old trials/MedicalConditionQuestionType versions.
     * @param {string} ctrId - ClinicalTrial.id
     * @returns an array of QuestionType. No duplicates.
     */
    async getLFormConditionQuestionTypes(ctrId: string): Promise<QuestionType[]> {
        const ctmcCollectionPromise = await ClinicalTrialMedicalCondition.find({ clinicalTrial: { id: ctrId } });
        const ctmcCollection = await ctmcCollectionPromise;
        if (!ctmcCollection.length) {
            throw new InternalServerErrorException("No clinicaltrialmedicalcondition for clinicaltrial " + ctrId);
        }
        const ctmc = ctmcCollection[0];
        let mcqtCollection = await MedicalConditionQuestionType.find({ where: { medicalCondition: ctmc.medicalCondition }, order: { ordering: "ASC" } });
        if (!mcqtCollection || mcqtCollection.length == 0)
            throw new InternalServerErrorException("No MedicalConditionQuestionType for mc " + ctmc.medicalCondition.code + "," + ctmc.medicalCondition.name + ". Please ask a technician to define template questions for this MedicalCondition.");
        console.log("mcqt", mcqtCollection);
        let qtCollection = [];
        let qtByLocalQuestionCode = {};
        mcqtCollection.forEach((ghiQt) => {
            const qt = ghiQt.questionType;
            qt.criteria = undefined; // erase all default criterias
            qtCollection.push(qt);
            qtByLocalQuestionCode[qt.localQuestionCode] = qt;
        });
        const lformCondition = await this.getLFormConditionQuestionTypeArray([ctrId]);
        lformCondition.forEach((ctqt) => {
            if (ctqt.criteria) {
                qtByLocalQuestionCode[ctqt.questionType.localQuestionCode].criteria = ctqt.criteria;
                qtByLocalQuestionCode[ctqt.questionType.localQuestionCode].criteriaLabel = ctqt.criteriaLabel;
            }
        });
        return qtCollection;
    }

    /**
     * Get the ClinicalTrialQuestionType[] for the general health information to one particular trial.
     * @param {string[]} ctrIdCollection - Array of Ctr.id
     * @returns an array of ClinicalTrialQuestionType sorted by stage+orederingm, including duplicates localQuestionCode.
     */
    async getLFormGeneralHealthInfo(ctrIdCollection: string[]): Promise<ClinicalTrialQuestionType[]> {
        const self = this;
        const q = this.connection
            .createQueryBuilder()
            .select("Cqt")
            .from(ClinicalTrialQuestionType, "Cqt")
            .leftJoinAndSelect("Cqt.clinicalTrial", "Ctr") // init basic ClinicalTrial info
            .leftJoinAndSelect("Cqt.questionType", "Qt")
            .leftJoinAndSelect("Qt.dataType", "Qdt")
            .where("Cqt.stage=10")
            .andWhere("Cqt.clinicaltrial IN (:...ctrIdCollection)", { ctrIdCollection: ctrIdCollection })
            .orderBy("Cqt.stage", "ASC")
            .addOrderBy("Cqt.ordering", "ASC")
            .addOrderBy("Cqt.id", "ASC"); // disambiguate state+ordering duplicates
        console.log(q.getSql());
        return q.getMany();
    }

    /**
     * Get an array of QuestionType for the given trial,
     * sorted by the order to display. (The order is actually
     * irrelevant as the GHI form is pre-defined on the app).
     * The QuestionType.criteria property is filled up when 
     * that question is part of the match criteria.
     * THIS IS ONLY EXPECTED TO WORK for the current version of GHI.
     * May not not properly for old trials/GHI versions.
     * @param {string} ctrId - ClinicalTrial.id
     * @returns an array of QuestionType. No duplicates.
     */
    async getLFormGeneralHealthInfoQuestionTypes(ctrId: string): Promise<QuestionType[]> {
        let whereOpts = [];
        let ghiQtCollection = await GeneralHealthInformationQuestionType.find({ where: whereOpts, order: { ordering: "ASC" } });
        let qtCollection = [];
        let qtByLocalQuestionCode = {};
        ghiQtCollection.forEach((ghiQt) => {
            const qt = ghiQt.questionType;
            qt.criteria = undefined; // erase all default criterias
            qtCollection.push(qt);
            qtByLocalQuestionCode[qt.localQuestionCode] = qt;
        });
        const lformGhi = await this.getLFormGeneralHealthInfo([ctrId]);
        lformGhi.forEach((ctqt) => {
            if (ctqt.criteria) {
                qtByLocalQuestionCode[ctqt.questionType.localQuestionCode].criteria = ctqt.criteria;
                qtByLocalQuestionCode[ctqt.questionType.localQuestionCode].criteriaLabel = ctqt.criteriaLabel;
            }
        });
        return qtCollection;
    }

    /**
     * Get the ClinicalTrialQuestionType[] for the condition specific answer to one particular trial
     * @param {string[]} ctrIdCollection Array of Ctr.id
     * @returns an array of ClinicalTrialQuestionType
     */
    async getLFormTrialQuestionTypeArray(ctrIdCollection: string[]): Promise<ClinicalTrialQuestionType[]> {
        const self = this;
        const q = this.connection
            .createQueryBuilder()
            .select("Cqt")
            .from(ClinicalTrialQuestionType, "Cqt")
            .leftJoinAndSelect("Cqt.clinicalTrial", "Ctr") // init basic ClinicalTrial info
            .leftJoinAndSelect("Cqt.questionType", "Qt")
            .leftJoinAndSelect("Qt.dataType", "Qdt")
            .where("Cqt.stage=40")
            .andWhere("Cqt.clinicaltrial IN (:...ctrIdCollection)", { ctrIdCollection: ctrIdCollection })
            .orderBy("Cqt.stage", "ASC")
            .addOrderBy("Cqt.ordering", "ASC")
            .addOrderBy("Cqt.id", "ASC"); // disambiguate state+ordering duplicates
        console.log(q.getSql());
        const cqtCollectionPromise = q.getMany();
        const cqtCollection = await cqtCollectionPromise;
        return cqtCollection;
    }

    /**
     * Get the items for the condition specific answer to one particular trial.
     * @param {string[]} ctrIdCollection Array of Ctr.id
     * @returns an array to be used as items
     */
    async getLFormTrialItems(ctrIdCollection: string[]): Promise<any> {
        const self = this;
        const q = this.connection
        const cqtCollection = await self.getLFormTrialQuestionTypeArray(ctrIdCollection);
        return self.mergeItems(cqtCollection);
    }

    /**
     * Get an array of QuestionType for the given trial,
     * sorted by the order to display, for the trial-specific questions. 
     * The QuestionType.criteria property is filled up when 
     * that question is part of the match criteria.
     * @param {string} ctrId - ClinicalTrial.id
     * @returns an array of QuestionType. No duplicates.
     */
    async getLFormTrialQuestionTypes(ctrId: string): Promise<QuestionType[]> {
        let cqtCollection = await this.getLFormTrialQuestionTypeArray([ctrId]);
        const trialQtArray = cqtCollection.map((cqt) => {
            const qt = cqt.questionType;
            qt.criteria = cqt.criteria;
            qt.criteriaLabel = cqt.criteriaLabel;
            return qt;
        });
        return trialQtArray;
    }


    /**
     * Merge items by localQuestionCode.
     * @param {ClinicalTrialQuestionType[]} cqtCollection - Array of ClinicalTrialQuestionType
     * @param {Object} [itemsByCode] - An object where the property key is QuestionType.localQuestionCode
     *        and the value is the item object. It will be initialized as an empty object.
     * @returns an array to be used as items. Items are enriched with ctrExtension.
     */
    mergeItems(cqtCollection: ClinicalTrialQuestionType[], itemsByCode?: any): any[] {
        const self = this;
        const items = [];
        if (!itemsByCode) {
            itemsByCode = {};
        }
        for (let i = 0; i < cqtCollection.length; i++) {
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

    /**
     * Re-creates the ClinicalTrialQuestionType records for stage=30
     * from the given QuestionType array.
     * @param ctrId ClinicalTrial.id
     * @param qtArray array of QuestionType, including criteria and criteriaLabel.
     */
    async updateLFormConditionQuestionTypes(ctrId: string, qtArray: QuestionType[]): Promise<void> {
        await this.connection.transaction(async tem => {
            // TODO lock ClinicalTrial ?
            const q = tem.connection
                .createQueryBuilder()
                .delete()
                .from(ClinicalTrialQuestionType, "Cqt")
                .where("stage=30")
                .andWhere("clinicaltrial = :ctrId", { ctrId: ctrId });
            console.log(q.getSql());
            let res = await q.execute();
            console.log("Deleted count: ", res.affected);
            for (let i = 0; i < qtArray.length; i++) {
                const qt = qtArray[i];
                // if (!qt.criteria) continue; even if no criteria, question must appear
                const cqt = tem.create(ClinicalTrialQuestionType, {
                    stage: 30,
                    ordering: 10000 + i * 100,
                    criteria: qt.criteria,
                    criteriaLabel: qt.criteriaLabel,
                    clinicalTrial: { id: ctrId },
                    questionType: { localQuestionCode: qt.localQuestionCode }
                });
                await tem.save(cqt);
            }
        });
    }

    /**
     * Re-creates the ClinicalTrialQuestionType records for stage=10
     * from the given QuestionType array.
     * @param ctrId ClinicalTrial.id
     * @param qtArray array of QuestionType, including criteria and criteriaLabel.
     */
    async updateLFormGeneralHealthInfoQuestionTypes(ctrId: string, qtArray: QuestionType[]): Promise<void> {
        await this.connection.transaction(async tem => {
            // TODO lock ClinicalTrial ?
            const q = tem.connection
                .createQueryBuilder()
                .delete()
                .from(ClinicalTrialQuestionType, "Cqt")
                .where("stage=10")
                .andWhere("clinicaltrial = :ctrId", { ctrId: ctrId });
            console.log(q.getSql());
            let res = await q.execute();
            console.log("Deleted count: ", res.affected);
            for (let i = 0; i < qtArray.length; i++) {
                const qt = qtArray[i];
                if (!qt.criteria) continue;
                const cqt = tem.create(ClinicalTrialQuestionType, {
                    stage: 10,
                    ordering: 10000 + i * 100,
                    criteria: qt.criteria,
                    criteriaLabel: qt.criteriaLabel,
                    clinicalTrial: { id: ctrId },
                    questionType: { localQuestionCode: qt.localQuestionCode }
                });
                await tem.save(cqt);
            }
        });
    }


    /**
     * Re-creates the ClinicalTrialQuestionType records for stage=40
     * from the given QuestionType array.
     * @param ctrId ClinicalTrial.id
     * @param qtArray array of QuestionType, including criteria and criteriaLabel.
     */
    async updateLFormTrialQuestionTypes(ctrId: string, qtArray: QuestionType[]): Promise<void> {
        await this.connection.transaction(async tem => {
            // TODO lock ClinicalTrial ?
            const q = tem.connection
                .createQueryBuilder()
                .delete()
                .from(ClinicalTrialQuestionType, "Cqt")
                .where("stage=40")
                .andWhere("clinicaltrial = :ctrId", { ctrId: ctrId });
            console.log(q.getSql());
            let res = await q.execute();
            console.log("Deleted count: ", res.affected);
            for (let i = 0; i < qtArray.length; i++) {
                const qt = qtArray[i];
                // if (!qt.criteria) continue; even if no criteria, question must appear
                const cqt = tem.create(ClinicalTrialQuestionType, {
                    stage: 40,
                    ordering: 10000 + i * 100,
                    criteria: qt.criteria,
                    criteriaLabel: qt.criteriaLabel,
                    clinicalTrial: { id: ctrId },
                    questionType: { localQuestionCode: qt.localQuestionCode }
                });
                await tem.save(cqt);
            }
        });
    }

}

