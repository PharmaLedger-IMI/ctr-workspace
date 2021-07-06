import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ClinicalTrialQuestionType } from "./clinicaltrialquastiontype.entity";
import { QuestionDataType } from "./questiondatatype.entity";

@Entity("questiontype")
export class QuestionType extends BaseEntity {

    @ApiProperty({ description: "The code for the question type. For the same question, there should be only one code." })
    @PrimaryColumn({ name: "localquestioncode" })
    localQuestionCode: string;

    @ApiProperty({ description: "Question text, including the question mark." })
    @Column()
    question: string;

    @ApiProperty()
    @ManyToOne(() => QuestionDataType, { eager: true })
    @JoinColumn({ name: "datatype", referencedColumnName: "code" })
    dataType: QuestionDataType;

    @ApiProperty({ description: "Optional HTML help text to display to the patient." })
    @Column({ name: "codinginstructions" })
    codingInstructions: string;

    @ApiProperty({ description: "Default minimum number of answers required. Set to 0 for optional question. Set to 1 for mandatory answer question." })
    @Column({ name: "answercardinalitymin" })
    answerCardinalityMin: number;

    @ApiProperty({ description: "For dataType.code CNE and CWE, JSON array of available answers. Set to null when using externallyDefinedAnswers." })
    @Column({type: 'jsonb'})
    answers: object;

    @ApiProperty({ description: "URL for CNE or CWE autocompletion. If defined, overrides answers." })
    @Column({ name: "externallydefined" })
    externallyDefined: string;

    @ApiProperty({ description: "LForms units definition text. Define only for data types that support units." })
    @Column()
    units: string;

    @ApiProperty({ description: "LForm restrictions expression." })
    @Column()
    restrictions: string;

    @ApiProperty({ description: "Expression to evaluate the acceptance of the question. TODO define the language." })
    @Column()
    criteria: string;

    @ApiProperty({ description: "Expression to skip the question. If filled, may contain references to other localQuestionCode." })
    @Column({ name: "skiplogic", type: 'jsonb' })
    skipLogic: object;

    @OneToMany(() => ClinicalTrialQuestionType, ctqt => ctqt.questionType, { eager: false })
    public clinicalTrialQuestionTypes: ClinicalTrialQuestionType[];
}
