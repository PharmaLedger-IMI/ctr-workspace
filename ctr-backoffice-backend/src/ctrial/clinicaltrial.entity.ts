import { BaseEntity, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

import { ClinicalTrialStatus } from "./clinicaltrialstatus.entity";
import { ClinicalSite } from "./clinicalsite.entity";
import { Sponsor } from "./sponsor.entity";
import { ClinicalTrialMedicalCondition } from "./clinicaltrialmedicalcondition.entity";
import { type } from "os";


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

    @ApiProperty()
    @ManyToOne(() => Sponsor, { eager: true })
    @JoinColumn({ name: "sponsor", referencedColumnName: "id" })
    sponsor: Sponsor;

    @ApiProperty()
    @ManyToOne(() => ClinicalSite, { eager: true })
    @JoinColumn({ name: "clinicalsite", referencedColumnName: "id" })
    clinicalSite: ClinicalSite;

}
