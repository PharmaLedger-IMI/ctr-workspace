import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity("location")
export class Location extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({description: "Textual description. Normally, in a City, Country format."})
    @Column()
    description: string;

    @ApiProperty({description: "GPS latitude in decimal format."})
    @Column()
    latitude: number;

    @ApiProperty({description: "GPS longitude in decimal format."})
    @Column()
    longitude: number;

    @ApiProperty({description: "true if this location correspond to a city center."})
    @Column()
    center: boolean;

    @ApiProperty({ description: "If this location was fetch from a query with travel distance criteria, then this property is filled up with the earth-globe-travel-distance in miles. Undefined otherwise." })
    travDistMiles: number | undefined;
}
