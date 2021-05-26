import { BaseEntity, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

import { ClinicalSite } from "./clinicalsite.entity";
import { Sponsor } from "./sponsor.entity";


@Entity("clinicaltrial")
export class ClinicalTrial extends BaseEntity {

    @ApiProperty()
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

    @ApiProperty()
    @ManyToOne(() => Sponsor, { eager: true })
    @JoinColumn({ name: "sponsor", referencedColumnName: "id" })
    sponsor: Sponsor;

    @ApiProperty()
    @ManyToOne(() => ClinicalSite, { eager: true })
    @JoinColumn({ name: "clinicalsite", referencedColumnName: "id" })
    clinicalSite: ClinicalSite;

    // calculated fields - TODO move them into PostgreSQL and let them be transparent ?
    @Column({ select: false, readonly: true, insert: false })
    name: string;

    @Column({ select: false, readonly: true, insert: false })
    description: string;
}
