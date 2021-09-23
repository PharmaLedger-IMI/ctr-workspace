import { ApiProperty } from "@nestjs/swagger";

/**
 * This class exists just to document the parameters to
 * /borest/ctrms/apply
 */
export class ApplicationDto {

    @ApiProperty({ description: "Patient's name" })
    name: string;

    @ApiProperty({ description: "Patient's email" })
    email: string;

    @ApiProperty({ description: "MatchRequest.keySSI" })
    matchRequest: string;

    @ApiProperty({ description: "ClinicalSite.id" })
    clinicalSite: string;

    @ApiProperty({ description: "ClinicalTrial.id" })
    clinicalTrial: string;

}
