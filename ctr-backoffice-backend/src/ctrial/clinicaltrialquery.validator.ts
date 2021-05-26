import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common"
import {IsDateString, IsInt, IsObject, IsOptional, IsString, Min, validate} from "class-validator"
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


export class ClinicalTrialQuery {

    @ApiProperty({ required: false, description: "Filter by exact match to ClinicalTrial.id"})
    @IsOptional()
    @IsString({each: true})
    readonly id: string;

    @ApiProperty({ required: false, description: "Filter by substring match to ClinicalTrial.dsuData.name"})
    @IsOptional()
    @IsString({each: true})
    readonly name: string;

    @ApiProperty({ required: false, description: "Filter by substring match to ClinicalTrial.dsuData.description"})
    @IsOptional()
    @IsString({each: true})
    readonly description: string;

    // jpsl: Tryed to use ClinicalSiteQuery object here, but did not work. Properties would be flattened.
    @ApiProperty({ required: false, description: "Filter by ClinicalTrial.clinicalSite.name substring match."})
    @IsOptional()
    @IsString({each: true})
    readonly clinicalSiteName: string;

    // jpsl: Tryed to use AddressQuery object here, but did not work. Properties would be flattened.
    @ApiProperty({ required: false, description: "Filter by ClinicalTrial.clinicalSite.address substring match to the concat of street with zip and country name. See inner fields."})
    @IsOptional()
    @IsString({each: true})
    readonly location: string;

    @ApiProperty({ required: false, description: "Number of items per page. Defaults to 2."})
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({value}) => parseInt(value))
    readonly limit: number = 2;

    @ApiProperty({ required: false, description: "Page number. Starts at zero. Defaults to zero."})
    @IsOptional()
    @IsInt()
    @Min(0)
    @Transform(({value}) => parseInt(value))
    readonly page: number = 0;

    @ApiProperty({ required: false, description: "Sort property."})
    @IsOptional()
    @IsString({each: true})
    readonly sortProperty: string;

}