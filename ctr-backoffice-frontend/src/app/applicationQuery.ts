export class ApplicationQuery {

    id: string | undefined;

    name: string | undefined;

    email: string | undefined;

    clinicalSiteId: string | undefined;

    clinicalTrialId: string | undefined;

    sponsorId: string | undefined;

    // common to all queries

    limit: number | undefined;

    page: number | undefined;

    sortProperty: string | undefined;

    sortDirection: string | undefined;
}
