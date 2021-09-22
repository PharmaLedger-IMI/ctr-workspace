export class ApplicationQuery {

    id: string | undefined;

    name: string | undefined;

    email: string | undefined;

    matchRequest: string | undefined;

    clinicalSite: string | undefined;

    clinicalTrial: string | undefined;

    // common to all queries

    limit: number | undefined;

    page: number | undefined;

    sortProperty: string | undefined;

    sortDirection: string | undefined;
}
