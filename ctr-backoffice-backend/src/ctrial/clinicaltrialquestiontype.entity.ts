import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { ClinicalTrial } from "./clinicaltrial.entity";
import { QuestionType } from "./questiontype.entity";

@Entity("clinicaltrialquestiontype")
export class ClinicalTrialQuestionType extends BaseEntity {

    /* Typeorm seems to need a non-composite PK on an association table.
       Otherwise it would complaint 
       MissingPrimaryColumnError: Entity "ClinicalTrialQuestionType" does not have a primary column.
    */
    @ApiProperty({ description: "Mandatory UUID string" })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({description: "Stage number. Stage 10 is for general health information questions (only used to specify criteria). Stage 30 is condition-specific questions. Stage 40 is trial-specific questions."})
    @Column()
    stage: number;

    @ApiProperty({description: "Order number. Lower should be displayed first."})
    @Column()
    ordering: number;

    @ApiProperty({description: "Criteria for match acceptance. If defined, overrides QuestionType.criteria. See QuestionType.criteria for details."})
    @Column()
    criteria: string;

    @ManyToOne(() => ClinicalTrial, ct => ct.clinicalTrialQuestionTypes, { eager: false })
    @JoinColumn({name: "clinicaltrial"})
    public clinicalTrial: ClinicalTrial;

    @ApiProperty()
    @ManyToOne(() => QuestionType, qt => qt.clinicalTrialQuestionTypes, { eager: true })
    @JoinColumn({name: "questiontype"})
    public questionType: QuestionType;
}
