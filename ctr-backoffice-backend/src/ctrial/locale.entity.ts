import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Locale extends BaseEntity {

    @ApiProperty()
    @PrimaryColumn()
    code: string;

    @ApiProperty()
    @Column()
    description: string
}
