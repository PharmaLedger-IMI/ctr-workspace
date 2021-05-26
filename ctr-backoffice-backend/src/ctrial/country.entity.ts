import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity("country")
export class Country extends BaseEntity {

    @ApiProperty({description: "2 letter ISO country code."})
    @PrimaryColumn()
    code: string;

    @ApiProperty({description: "Name of the country."})
    @Column()
    name: string;
}
