import { ManyToOne, ChildEntity, JoinColumn } from "typeorm";

import { AppUser } from "./appuser.entity";
import { Sponsor } from "./sponsor.entity";

@ChildEntity()
export class SponsorUser extends AppUser {

    @ManyToOne(() => Sponsor, { eager: true })
    @JoinColumn({ name: "sponsor", referencedColumnName: "id" })
    sponsor: Sponsor;
}
