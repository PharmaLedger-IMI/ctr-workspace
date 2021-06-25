import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity("questiondatatype")
export class QuestionDataType extends BaseEntity {

    @ApiProperty({ description: "Using the same codes as LForms 29.0.x, plus YN" })
    @PrimaryColumn()
    code: string;

    @ApiProperty({ description: "Data type description" })
    @Column()
    description: string;
}
