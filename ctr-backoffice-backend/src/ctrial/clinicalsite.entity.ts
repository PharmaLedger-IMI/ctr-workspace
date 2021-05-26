import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Address } from "./address.entity";

@Entity("clinicalsite")
export class ClinicalSite extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({description: "Name of the clinical site."})
    @Column()
    name: string;

    @ApiProperty()
    @ManyToOne(() => Address, { eager: true })
    @JoinColumn({ name: "address", referencedColumnName: "id" })
    address: Address;
}
