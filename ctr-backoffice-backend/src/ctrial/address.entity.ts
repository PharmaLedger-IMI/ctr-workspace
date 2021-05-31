import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Country } from "./country.entity";
import { Location } from "./location.entity";

@Entity("address")
export class Address extends BaseEntity {

    @ApiProperty({description: "Random UUIDv4. Orphan (unused) addresses might be removed without notice."})
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({description: "Street name, including door number and floor. Free format."})
    @Column()
    street: string;

    @ApiProperty()
    @ManyToOne(() => Country, { eager: true })
    @JoinColumn({ name: "country", referencedColumnName: "code" })
    country: Country;

    @ApiProperty()
    @ManyToOne(() => Location, { eager: true })
    @JoinColumn({ name: "location", referencedColumnName: "id" })
    location: Location;
}
