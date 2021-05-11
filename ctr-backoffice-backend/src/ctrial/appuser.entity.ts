import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, BaseEntity, ManyToOne, TableInheritance} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity("appuser")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class AppUser extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column({name: "firstname"})
    firstName: string;

    @ApiProperty()
    @Column({name: "lastname"})
    lastName: string;

    @ApiProperty()
    @Column()
    username: string;

    @ApiProperty()
    @Column({name: "passhash"})
    passHash: string;

    @ApiProperty({ description: "Possible values are ClinicalSiteUser, PhysicianUser, SponsorUser" })
    @Column()
    type: string;
}
