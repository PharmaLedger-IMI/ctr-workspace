import {Column, ManyToOne, ChildEntity} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

import { AppUser } from "./appuser.entity";

@ChildEntity()
export class SponsorUser extends AppUser {

    @ApiProperty()
    @Column()
    sponsor: string;
}
