import { ApiProperty } from '@nestjs/swagger';
import { UserCredentials } from './usercredentials';

/**
 * Use only for authentication using Passport.
 */
export class UserSignUp extends UserCredentials {

    @ApiProperty()
    firstName: string; // must be called firstName

    @ApiProperty()
    lastName: string; // must be called lastName

    @ApiProperty({required: false, description: "sponsorId can only be filled when type='SponsorUser'"})
    sponsorId: string | undefined;
 
    @ApiProperty({required: false, description: "clinicalSiteId must be filled when type='ClinicalSiteUser'. type='PhysicianUser' it is optional. Must be undefined for other types."})
    clinicalSiteId: string | undefined;
 
    @ApiProperty({ description: "Possible values are ClinicalSiteUser, PhysicianUser, SponsorUser" })
    type: string;

    constructor() {
        super();
        this.firstName = '';
        this.lastName = '';
        this.type = '?';
    }
}
