import {Column, ManyToOne, ChildEntity} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

import { AppUser } from "./appuser.entity";

@ChildEntity()
export class ClinicalSiteUser extends AppUser {

    @ApiProperty()
    @Column()
    clinicalsite: string;
}
