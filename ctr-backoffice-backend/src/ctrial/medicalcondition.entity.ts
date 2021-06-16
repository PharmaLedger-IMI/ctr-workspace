import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, JoinColumn, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("medicalcondition")
export class MedicalCondition extends BaseEntity {

    @ApiProperty({ description: "Internal numeric code for medical conditions based on https://clinicaltables.nlm.nih.gov/api/conditions/v3/search ."})
    @PrimaryColumn()
    code: number;

    @ApiProperty({ description: "Readable name."})
    @Column()
    name: string;
}
