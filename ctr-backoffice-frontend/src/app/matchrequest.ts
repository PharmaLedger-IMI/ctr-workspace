export interface MatchRequest {

    keyssi: string;

    dsuData: string;

    matchResult: string | undefined;

    healthInfo: string | undefined;
    
    createdOn: Date;
}
