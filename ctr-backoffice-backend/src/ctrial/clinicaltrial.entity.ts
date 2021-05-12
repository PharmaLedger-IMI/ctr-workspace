import { BaseEntity, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

import { ClinicalSite } from "./clinicalsite.entity";
import { Sponsor } from "./sponsor.entity";


@Entity("clinicaltrial")
export class ClinicalTrial extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column({name: "keyssi"})
    keySsi: string;

    @ApiProperty()
    @Column({
        name: "dsudata",
        type: 'jsonb'
    })
    dsuData: any;

    @ManyToOne(() => Sponsor, { eager: true })
    @JoinColumn({ name: "sponsor", referencedColumnName: "id" })
    sponsor: Sponsor;

    @ManyToOne(() => ClinicalSite, { eager: true })
    @JoinColumn({ name: "clinicalsite", referencedColumnName: "id" })
    clinicalSite: ClinicalSite;
}
