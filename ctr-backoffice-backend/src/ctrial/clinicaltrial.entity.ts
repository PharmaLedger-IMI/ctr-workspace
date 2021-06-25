import { BaseEntity, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

import { ClinicalTrialStatus } from "./clinicaltrialstatus.entity";
import { ClinicalSite } from "./clinicalsite.entity";
import { Sponsor } from "./sponsor.entity";
import { ClinicalTrialMedicalCondition } from "./clinicaltrialmedicalcondition.entity";
import { type } from "os";
import { ClinicalTrialQuestionType } from "./clinicaltrialquastiontype.entity";


@Entity("clinicaltrial")
export class ClinicalTrial extends BaseEntity {

    @ApiProperty({ description: "Mandatory UUID string" })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({ description: "Mandatory name" })
    @Column()
    name: string;

    @ApiProperty({ description: "Mandatory description" })
    @Column()
    description: string;

    @ApiProperty()
    @ManyToOne(() => ClinicalTrialStatus, { eager: true })
    @JoinColumn({ name: "status", referencedColumnName: "code" })
    status: ClinicalTrialStatus;

    @ApiProperty({ description: "OpenDSU key seedSSI/sReadSSI of the DSU for this trial" })
    @Column({name: "keyssi"})
    keySsi: string;

    @ApiProperty({ description: "Additional JSON data shared with the Patient Application"})
    @Column({
        name: "dsudata",
        type: 'jsonb'
    })
    dsuData: any;

    @ApiProperty({ type: [ClinicalTrialMedicalCondition] })
    @OneToMany(() => ClinicalTrialMedicalCondition, clinicalTrialMedicalCondition => clinicalTrialMedicalCondition.clinicalTrial)
    public clinicalTrialMedicalConditions: ClinicalTrialMedicalCondition[];

    @ApiProperty({ type: [ClinicalTrialQuestionType], required: false })
    @OneToMany(() => ClinicalTrialQuestionType, clinicalTrialQuestionType => clinicalTrialQuestionType.clinicalTrial, { eager: false })
    public clinicalTrialQuestionTypes?: Promise<ClinicalTrialQuestionType[]>;

    @ApiProperty()
    @ManyToOne(() => Sponsor, { eager: true })
    @JoinColumn({ name: "sponsor", referencedColumnName: "id" })
    sponsor: Sponsor;

    @ApiProperty()
    @ManyToOne(() => ClinicalSite, { eager: true })
    @JoinColumn({ name: "clinicalsite", referencedColumnName: "id" })
    clinicalSite: ClinicalSite;

    @ApiProperty({ description: "NCT number. May be undefined or null."})
    @Column({name: "nctnumber"})
    nctNumber: string;

    @ApiProperty({ description: "Free text describing the purpose of the trial."})
    @Column()
    purpose: string | undefined;

    @ApiProperty({ description: "Free text describing the phase of the trial."})
    @Column()
    phase: string | undefined;

    @ApiProperty({ description: "Free text describing the time commitment asked to the patient."})
    @Column({ name: "timecommitment" })
    timeCommitment: string | undefined;

    @ApiProperty({ description: "Free text describing the physical commitment asked to the patient."})
    @Column({ name: "physicalcommitment" })
    physicalCommitment: string | undefined;

    @ApiProperty({ description: "Free text describing the travel stipends provided to the patient."})
    @Column({ name: "travelstipends" })
    travelStipends: string | undefined;

    @ApiProperty({ description: "Free HTML text describing the eligibility criteria to the the patient."})
    @Column({ name: "eligibilitycriteria" })
    eligibilityCriteria: string | undefined;

    @ApiProperty({ description: "If this ClinicalTrial was fetch from a query with travel distance criteria, then this property is filled up with the earth-globe-travel-distance in miles. Undefined otherwise." })
    travDistMiles: number | undefined;
}
