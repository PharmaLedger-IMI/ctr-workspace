import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common"
import {IsEnum, IsInt, IsNumber, IsOptional, IsString, Min, validate} from "class-validator"
import {plainToClass, Transform} from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

@Injectable()
export class ApplicationQueryValidator implements PipeTransform<ApplicationQuery> {
    async transform(value: object, metadata: ArgumentMetadata): Promise<ApplicationQuery> {
        console.log('applicationquery.validator.transform raw=', value);
        const search = plainToClass(metadata.metatype, value);
        const errors = await validate(search, {skipMissingProperties: false, whitelist: true, transform: true});
        if (errors.length > 0) {
            const message = Object.values(errors[0].constraints).join(". ").trim();
            throw new BadRequestException(message);
        }
        console.log('applicationquery.validator.transform return=', search);
        return search;
    }
}

enum ApplicationQuerySortProperty {
    NAME = "NAME",
    EMAIL = "EMAIL",
    CREATED_ON = "CREATED_ON"
};
enum ApplicationQuerySortDirection {
    ASC = "ASC",
    DESC = "DESC"
};
export class ApplicationQuery {

    @ApiProperty({ required: false, description: "Filter by exact match to Application.id"})
    @IsOptional()
    @IsString({each: true})
    id: string;

    @ApiProperty({ required: false, description: "Filter by substring match to patient's name"})
    @IsOptional()
    @IsString({each: true})
    name: string;

    @ApiProperty({ required: false, description: "Filter by substring match to patient's email"})
    @IsOptional()
    @IsString({each: true})
    email: string;

    // jpsl: Tryed to use ClinicalTrialQuery object here, but did not work. Properties would be flattened.
    @ApiProperty({ required: false, description: "Filter by ClinicalTrial.id exact match."})
    @IsOptional()
    @IsString({each: true})
    clinicalTrialId: string;

    @ApiProperty({ required: false, description: "Filter by ClinicalSite.id exact match."})
    @IsOptional()
    @IsString({each: true})
    clinicalSiteId: string;

    @ApiProperty({ required: false, description: "Filter by Sponsor.id exact match."})
    @IsOptional()
    @IsString({each: true})
    sponsorId: string;

    @ApiProperty({ required: false, description: "Number of items per page. Defaults to 100."})
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({value}) => parseInt(value))
    limit: number = 100;

    @ApiProperty({ required: false, description: "Page number. Starts at zero. Defaults to zero."})
    @IsOptional()
    @IsInt()
    @Min(0)
    @Transform(({value}) => parseInt(value))
    page: number = 0;

    @ApiProperty({ required: false, description: "Sort property name. Defaults to CREATED_ON. Possible values are NAME, EMAIL, CREATED_ON."})
    @IsOptional()
    @IsEnum(ApplicationQuerySortProperty, {each: true})
    sortProperty: ApplicationQuerySortProperty = ApplicationQuerySortProperty.CREATED_ON;

    @ApiProperty({ required: false, description: "Sort property order. Use ASC or DESC. Defaults to ASC."})
    @IsOptional()
    @IsEnum(ApplicationQuerySortDirection, {each: true})
    sortDirection: ApplicationQuerySortDirection = ApplicationQuerySortDirection.ASC;

};