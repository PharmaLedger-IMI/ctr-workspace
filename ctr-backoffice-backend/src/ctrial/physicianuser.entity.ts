import { ChildEntity } from "typeorm";

import { AppUser } from "./appuser.entity";

@ChildEntity()
export class PhysicianUser extends AppUser {

}
