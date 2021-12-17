import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClinicalSite } from "./clinicalsite.entity";
import { ClinicalTrial } from "./clinicaltrial.entity";
import { MatchRequest } from "./matchrequest.entity";

@Entity("application")
export class Application extends BaseEntity {

    @ApiProperty({ description: "UUID string. Generated when inserting into database." })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({ description: "Patient's name" })
    @Column()
    name: string;

    @ApiProperty({ description: "Patient's email" })
    @Column()
    email: string;

    @ApiProperty({ description: "Patient's phone" })
    @Column()
    phone: string;

    @ApiProperty({ description: "MatchRequest.keySSI" })
    @ManyToOne(() => MatchRequest, { eager: true })
    @JoinColumn({ name: "matchrequest", referencedColumnName: "keyssi" })
    matchRequest: MatchRequest;

    @ApiProperty({ description: "ClinicalSite.id" })
    @ManyToOne(() => ClinicalSite, { eager: true })
    @JoinColumn({ name: "clinicalsite", referencedColumnName: "id" })
    clinicalSite: ClinicalSite;

    @ApiProperty({ description: "ClinicalTrial.name" })
    clinicalSiteName: string;

    @ApiProperty({ description: "ClinicalTrial.id" })
    @ManyToOne(() => ClinicalTrial, { eager: true })
    @JoinColumn({ name: "clinicaltrial", referencedColumnName: "id" })
    clinicalTrial: ClinicalTrial;

    @ApiProperty({ description: "Timestamp of record creation. Any value submitted by the patient is ignored." })
    @Column({ name: "createdon", type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdOn: Date;
}
