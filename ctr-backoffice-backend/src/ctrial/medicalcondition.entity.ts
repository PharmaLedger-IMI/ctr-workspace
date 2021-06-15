import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, JoinColumn, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("medicalcondition")
export class MedicalCondition extends BaseEntity {

    @ApiProperty()
    @PrimaryColumn()
    code: number;

    @ApiProperty()
    @Column()
    name: string;
}
