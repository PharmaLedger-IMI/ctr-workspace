import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, JoinColumn, BaseEntity, ManyToOne, PrimaryColumn, OneToMany } from "typeorm";
import { ClinicalTrialMedicalCondition } from "./clinicaltrialmedicalcondition.entity";
import { MedicalConditionQuestionType } from "./medicalconditionquestiontype.entity";

@Entity("medicalcondition")
export class MedicalCondition extends BaseEntity {

    @ApiProperty({ description: "Internal numeric code for medical conditions based on https://clinicaltables.nlm.nih.gov/api/conditions/v3/search . Do not pad extra with leading zeros."})
    @PrimaryColumn()
    code: string;

    @ApiProperty({ description: "Readable name."})
    @Column()
    name: string;

    @OneToMany(() => ClinicalTrialMedicalCondition, ctmc => ctmc.medicalCondition, { eager: false })
    public clinicalTrialMedicalConditions: ClinicalTrialMedicalCondition[];

    // bug #35 // @OneToMany(() => MedicalConditionQuestionType, mcqt => mcqt.questionType, { eager: false })
    @OneToMany('MedicalConditionQuestionType', 'questionType', { eager: false })
    public medicalConditionQuestionTypes: MedicalConditionQuestionType[];    
}
