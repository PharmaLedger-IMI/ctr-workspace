import { Controller, Request, Body, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UserCredentials } from './usercredentials';
import { UserSignUp } from './usersignup';
import { AppUser } from 'src/ctrial/appuser.entity';
import { ClinicalSiteUser } from 'src/ctrial/clinicalsiteuser.entity';
import { SponsorUser } from 'src/ctrial/sponsoruser.entity';

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
    constructor(
        private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    @ApiOkResponse({
        description: 'The credentials are validated, and user session information is returned. clinicalSite or sponsor properties only appear if the user is associated with one of those.',
        schema: {
            type: "object",
            required: ['id', 'firstName', 'lastName', 'username', 'token'],
            properties: {
                id: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                username: { type: 'string' },
                token: { type: 'string' },
                clinicalSite: { type: 'object' , description: "clinicalSite or sponser are filled when user is associated with that organization."},
                sponsor: { type: 'object' },
            },
        },
   })
   @ApiUnauthorizedResponse({ description: 'The credentials are not valid.', })
    async login(@Body() userCredentials: UserCredentials, @Request() req: any) {
        // @Body is here to tell swagger what fields are required.
        // local.strategy already validated the username/password and filled req.user with an AppUser
        let auDb = req.user;
        console.log("/auth/login auDb =", auDb);
        let auJwt = this.authService.login(auDb);
        return auJwt;
    }


    // just to test the /login
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post('/get/current')
    async getCurrentLoggedUser(@Request() req: any) {
        if (req.user) {
            return req.user;
        } else {
            return null;
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post('/logout')
    async logout(@Request() req: any) {
        return await this.authService.logout(req.user)
    }


    @Post('/signup')
    @ApiOkResponse({
        description: 'Sign up a new user, and authenticates it, returning a JWT token.',
        schema: {
            type: "object",
            required: ['id', 'firstName', 'lastName', 'username', 'token'],
            properties: {       
                id: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                username: { type: 'string' },
                token: { type: 'string' },
                clinicalSite: { type: 'object' , description: "clinicalSite or sponser are filled when user is associated with that organization."},
                sponsor: { type: 'object' },
            },
        },
    })
    @ApiInternalServerErrorResponse({ description: 'Something failed. Please look at the error message for details.' })
    async signUp(@Body() userSignUp: UserSignUp, @Request() req: any) {
        // @Body is here to tell swagger what fields are required.
        // local.strategy already validated the username/password and filled req.user with an AppUser
        console.log("/auth/signup userSignUp =", userSignUp);
        let auJwt = this.authService.signUp(userSignUp);
        return auJwt;
    }
}

