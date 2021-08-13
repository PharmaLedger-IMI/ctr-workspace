import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from "./questiontype.entity";

@Entity("generalhealthinformationquestiontype")
export class GeneralHealthInformationQuestionType extends BaseEntity {

    /* Typeorm seems to need a non-composite PK on an association table.
       Otherwise it would complaint 
       MissingPrimaryColumnError: Entity "GeneralHealthInformationQuestionType" does not have a primary column.
    */
    @ApiProperty({ description: "Mandatory UUID string" })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({description: "Order number. Lower should be displayed first."})
    @Column()
    ordering: number;

    @ApiProperty()
    @ManyToOne(() => QuestionType, qt => qt.generalHealthInformationQuestionTypes, { eager: true })
    @JoinColumn({name: "questiontype"})
    public questionType: QuestionType;
}
