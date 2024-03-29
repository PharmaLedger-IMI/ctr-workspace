import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common"
import {IsEnum, IsInt, IsNumber, IsOptional, IsString, Min, validate} from "class-validator"
import {plainToClass, Transform} from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

@Injectable()
export class ClinicalTrialQueryValidator implements PipeTransform<ClinicalTrialQuery> {
    async transform(value: object, metadata: ArgumentMetadata): Promise<ClinicalTrialQuery> {
        console.log('clinicaltrialquery.validator.transform raw=', value)
        const search = plainToClass(metadata.metatype, value)
        const errors = await validate(search, {skipMissingProperties: false, whitelist: true, transform: true})
        if (errors.length > 0) {
            const message = Object.values(errors[0].constraints).join(". ").trim()
            throw new BadRequestException(message)
        }
        console.log('clinicaltrialquery.validator.transform return=', search)
        return search
    }
}

export enum ClinicalTrialQuerySortProperty {
    NAME = "NAME",
    DESCRIPTION = "DESCRIPTION",
    SITE_NAME = "SITE_NAME",
    SPONSOR_NAME = "SPONSOR_NAME",
    TRAVEL_DISTANCE = "TRAVEL_DISTANCE"
};
export enum ClinicalTrialQuerySortDirection {
    ASC = "ASC",
    DESC = "DESC"
};
export class ClinicalTrialQuery {

    @ApiProperty({ required: false, description: "Filter by exact match to ClinicalTrial.id"})
    @IsOptional()
    @IsString({each: true})
    id: string;

    @ApiProperty({ required: false, description: "Filter by substring match to ClinicalTrial.name"})
    @IsOptional()
    @IsString({each: true})
    name: string;

    @ApiProperty({ required: false, description: "Filter by substring match to ClinicalTrial.description"})
    @IsOptional()
    @IsString({each: true})
    description: string;

    @ApiProperty({ required: false, description: "Filter by extract match to ClinicalTrial.status. See ClinicalTrialStatus for possible values."})
    @IsOptional()
    @IsString({each: true})
    status: string;

    @ApiProperty({ required: false, description: "Filter by substring match to ClinicalTrial.clinicalTrialMedicalConditions[*].medicalCondition.name"})
    @IsOptional()
    @IsString({each: true})
    medicalConditionName: string;

    @ApiProperty({ required: false, description: "Filter by exact match to ClinicalTrial.clinicalTrialMedicalConditions[*].medicalCondition.code"})
    @IsOptional()
    @IsString({each: true})
    medicalConditionCode: string;

    // jpsl: Tryed to use ClinicalSiteQuery object here, but did not work. Properties would be flattened.
    @ApiProperty({ required: false, description: "Filter by existing at least one ClinicalTrial.clinicalSites[*].id exact match."})
    @IsOptional()
    @IsString({each: true})
    clinicalSiteId: string;

    // jpsl: Tryed to use ClinicalSiteQuery object here, but did not work. Properties would be flattened.
    @ApiProperty({ required: false, description: "Filter by ClinicalTrial.clinicalSite.name substring match."})
    @IsOptional()
    @IsString({each: true})
    clinicalSiteName: string;

    // jpsl: Tryed to use AddressQuery object here, but did not work. Properties would be flattened.
    @ApiProperty({ required: false, description: "Filter by ClinicalTrial.clinicalSite.address substring match to the concat of street with postalCode, postalCodeDesc and Country.name."})
    @IsOptional()
    @IsString({each: true})
    address: string;

    @ApiProperty({ required: false, description: "Filter by Location.id. When supplied, will look for an exact match with address.location. (Do not define travelDistance and neither latitude, longitude)."})
    @IsOptional()
    @IsString({each: true})
    locationId: string;

    @ApiProperty({ required: false, description: "Latitude of the user asking for trials. Decimal format."})
    @IsOptional()
    @IsNumber()
    @Transform(({value}) => parseFloat(value))
    latitude: number;

    @ApiProperty({ required: false, description: "Logitude of the user asking for trials. Decimal format."})
    @IsOptional()
    @IsNumber()
    @Transform(({value}) => parseFloat(value))
    longitude: number;

    @ApiProperty({ required: false, description: "When supplied, latitude and longitude must be supplied also. Filter results by (distance between ClinicalTrial.clinicalSite.address.location and given location) <= travelDistance. Unit is in miles."})
    @IsOptional()
    @IsNumber()
    @Transform(({value}) => parseFloat(value))
    travelDistance: number;

    @ApiProperty({ required: false, description: "Filter by exact match to Sponsor.id"})
    @IsOptional()
    @IsString({each: true})
    sponsorId: string;

    @ApiProperty({ required: false, description: "Filter by Sponsor.name substring match"})
    @IsOptional()
    @IsString({each: true})
    sponsorName: string;

    @ApiProperty({ required: false, description: "Number of items per page. Defaults to 10."})
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({value}) => parseInt(value))
    limit: number = 10;

    @ApiProperty({ required: false, description: "Page number. Starts at zero. Defaults to zero."})
    @IsOptional()
    @IsInt()
    @Min(0)
    @Transform(({value}) => parseInt(value))
    page: number = 0;

    @ApiProperty({ required: false, description: "Sort property name. Defaults to NAME. Possible values are NAME, DESCRIPTION, SITE_NAME, SPONSOR_NAME, TRAVEL_DISTANCE."})
    @IsOptional()
    @Transform(({value}) => {
        return value.toUpperCase()
    })
    @IsEnum(ClinicalTrialQuerySortProperty, {each: true})
    sortProperty: ClinicalTrialQuerySortProperty = ClinicalTrialQuerySortProperty.NAME;

    @ApiProperty({ required: false, description: "Sort property order. Use ASC or DESC. Defaults to ASC."})
    @IsOptional()
    @Transform(({value}) => {
        return value.toUpperCase()
    })
    @IsEnum(ClinicalTrialQuerySortDirection, {each: true})
    sortDirection: ClinicalTrialQuerySortDirection = ClinicalTrialQuerySortDirection.ASC;

};