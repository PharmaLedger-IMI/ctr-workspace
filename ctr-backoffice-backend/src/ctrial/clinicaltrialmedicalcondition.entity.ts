import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { ClinicalTrial } from "./clinicaltrial.entity";
import { MedicalCondition } from "./medicalcondition.entity";

@Entity("clinicaltrialmedicalcondition")
export class ClinicalTrialMedicalCondition extends BaseEntity {

    /* Typeorm seems to need a non-composite PK on an association table.
       Otherwise it would complaint 
       MissingPrimaryColumnError: Entity "ClinicalTrialMedicalCondition" does not have a primary column.
    */
    @ApiProperty({ description: "Mandatory UUID string" })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({description: "Order number. Lower should be displayed first."})
    @Column()
    ordering: string;

    @ManyToOne(() => ClinicalTrial, ct => ct.clinicalTrialMedicalConditions, { eager: false })
    @JoinColumn({name: "clinicaltrial"})
    public clinicalTrial: ClinicalTrial;

    @ApiProperty()
    @ManyToOne(() => MedicalCondition, mc => mc.clinicalTrialMedicalConditions, { eager: true })
    @JoinColumn({name: "medicalcondition"})
    public medicalCondition: MedicalCondition;
}
