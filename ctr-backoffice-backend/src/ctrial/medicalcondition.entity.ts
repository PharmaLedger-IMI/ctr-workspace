import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, JoinColumn, BaseEntity, ManyToOne, PrimaryColumn, OneToMany } from "typeorm";
import { ClinicalTrialMedicalCondition } from "./clinicaltrialmedicalcondition.entity";

@Entity("medicalcondition")
export class MedicalCondition extends BaseEntity {

    @ApiProperty({ description: "Internal numeric code for medical conditions based on https://clinicaltables.nlm.nih.gov/api/conditions/v3/search ."})
    @PrimaryColumn()
    code: number;

    @ApiProperty({ description: "Readable name."})
    @Column()
    name: string;

    @OneToMany(() => ClinicalTrialMedicalCondition, ctmc => ctmc.medicalCondition, { eager: false })
    public clinicalTrialMedicalConditions: ClinicalTrialMedicalCondition[];
}
