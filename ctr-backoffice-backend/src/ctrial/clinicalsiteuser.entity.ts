import { Column, ChildEntity, JoinColumn, ManyToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

import { AppUser } from "./appuser.entity";
import { ClinicalSite } from "./clinicalsite.entity";

@ChildEntity()
export class ClinicalSiteUser extends AppUser {

    @ManyToOne(() => ClinicalSite, { eager: true })
    @JoinColumn({ name: "clinicalsite", referencedColumnName: "id" })
    clinicalSite: ClinicalSite;
}
