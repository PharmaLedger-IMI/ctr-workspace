import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity("sponsor")
export class Sponsor extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column()
    name: string;
}
