import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppUser } from 'src/ctrial/appuser.entity';
import { AppUserService } from '../ctrial/appuser.service';

@Injectable()
export class AuthService {
    constructor(
        private auService: AppUserService,
        private jwtService: JwtService
    ) { }

    /**
     * Validate a username/password.
     * @param auUsername 
     * @param auPassHash password in clear text.
     * @returns an AppUser if matched. null if not matched.
     */
    async validateUser(auUsername: string, auPassHash: string): Promise<any> {
        console.log("AuthService.validateUser ", auUsername, auPassHash);
        if (!auUsername) {
            console.log("AuthService.validateUser returned null because of missing username");
            return null;
        }
        const auCollection = await this.auService.findByUsername(auUsername);
        console.log("AuthService.validateUser found ", auCollection);
        if (!auCollection || auCollection.length == 0) {
            console.log("AuthService.validateUser returned null because username not found!");
            return null;
        }
        if (auCollection[0].passHash === auPassHash // TODO clear text comparison to bcrypt
        ) {
            console.log("AuthService.validateUser returned ", auCollection[0]);
            return auCollection[0];
        }
        console.log("AuthService.validateUser returned null");
        return null;
    }

    /**
     * Transforms a valid AppUser into a valid (signed) JWT token.
     * @param au an AppUser object, as returned by LocalStrategy.validate()
     * @returns an object with the JWT authentication token. Please document the return type in the auth.controller.ts login method
     */
    async login(au: any) {
        const payload = { id: au.id, username: au.username };
        let loginObject = {
            id: au.id,
            username: au.username,
            firstName: au.firstName,
            lastName: au.lastName,
            token: this.jwtService.sign(payload),
        };
        ['clinicalSite','sponsor'].forEach( ( aPropName ) => {
            if (au[aPropName]) {
                loginObject[aPropName] = au[aPropName];
            }
        });
        return loginObject;
    }

    /**
     * Marks this JWT token as expired.
     * @param au an AppUser object, as returned by JwtStrategy.validate()
     * @returns an object with the JWT authentication token.
     */
    async logout(au: any) {
        // TODO
        return au;
    }

    /**
     * Creates the user in the BD and creates a token.
     * @param auJson a parsed JSON object suitable for an AppUser. Must have extra sponsorId or clinicalSiteId properties.
     * @returns an object with the JWT authentication token.
     */
    async signUp(auJson: any) {
        const newAu = await this.auService.signUp(auJson);
        const auJwt = await this.login(newAu);
        return auJwt;
    }
}
