import { ApiProperty } from '@nestjs/swagger';

/**
 * Use only for authentication using Passport.
 */
export class UserCredentials {

    @ApiProperty()
    username: string; // must be called username

    @ApiProperty()
    password: string; // must be called password - in clear text

    @ApiProperty({ description: "Possible values are ClinicalSiteUser, PhysicianUser, SponsorUser" })
    type: string;

    constructor() {
        this.username = '';
        this.password = '';
        this.type = '';
    }
}
