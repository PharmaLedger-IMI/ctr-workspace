
/**
 * Frontend user session object.
 */
export class User {
    id: string | undefined; // UUID
    username: string | undefined;
    password: string | undefined; // filled only during login form handling. undefined during session
    token: string | undefined; // ctr-backoffice-backend JWT token
    //roles: Role[];
    //organization: Organization;
    //organizationId: string;
    //roleId: string;
    clinicalSite: any; // TODO any model here ?
    sponsor: any; // TODO any model here ?
    physician: any; // TODO any model here ?
}
