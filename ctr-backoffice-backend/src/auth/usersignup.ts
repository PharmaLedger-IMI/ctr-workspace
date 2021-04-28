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

    @ApiProperty({description: "Only one of sponsorId or clinicalSiteId can be filled with the UUID of the organization"})
    sponsorId: string;
 
    @ApiProperty()
    clinicalSiteId: string;
 
    constructor() {
        super();
        this.firstName = '';
        this.lastName = '';
    }
}
