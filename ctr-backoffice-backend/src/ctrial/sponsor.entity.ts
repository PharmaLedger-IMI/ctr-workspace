import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity("sponsor")
export class Sponsor extends BaseEntity {

    @ApiProperty({description: "Unique sponsor key identifier."})
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({description: "Name of the sponsor."})
    @Column()
    name: string;

    @ApiProperty({description: "URI path of the logo. May be empty or null."})
    @Column({ nullable: true })
    logo: string;
}
