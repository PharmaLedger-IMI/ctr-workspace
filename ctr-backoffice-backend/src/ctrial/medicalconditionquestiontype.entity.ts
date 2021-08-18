import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from "./questiontype.entity";
import { MedicalCondition } from "./medicalcondition.entity";

@Entity("medicalconditionquestiontype")
export class MedicalConditionQuestionType extends BaseEntity {

    /* Typeorm seems to need a non-composite PK on an association table.
       Otherwise it would complaint 
       MissingPrimaryColumnError: Entity "ClinicalTrialQuestionType" does not have a primary column.
    */
    @ApiProperty({ description: "Mandatory UUID string" })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({description: "Order number. Lower should be displayed first."})
    @Column()
    ordering: number;

    @ApiProperty()
    @ManyToOne(() => QuestionType, qt => qt.medicalConditionQuestionTypes, { eager: true })
    @JoinColumn({name: "questiontype"})
    public questionType: QuestionType;

    
    @ApiProperty()
    @ManyToOne(() => MedicalCondition, mc => mc.medicalConditionQuestionTypes, { eager: false })
    @JoinColumn({name: "medicalcondition"})
    public medicalCondition: MedicalCondition;
}
