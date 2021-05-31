import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common"
import {IsBoolean, IsDateString, IsEnum, IsInt, IsObject, IsOptional, IsString, Max, Min, validate} from "class-validator"
import {plainToClass, Transform} from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { MaxKey } from "typeorm"

@Injectable()
export class LocationQueryValidator implements PipeTransform<LocationQuery> {
    async transform(value: object, metadata: ArgumentMetadata): Promise<LocationQuery> {
        console.log('locationquery.validator.transform raw=', value)
        const search = plainToClass(metadata.metatype, value)
        const errors = await validate(search, {skipMissingProperties: false, whitelist: true, transform: true})
        if (errors.length > 0) {
            const message = Object.values(errors[0].constraints).join(". ").trim()
            throw new BadRequestException(message)
        }
        console.log('locationquery.validator.transform return=', search)
        return search
    }
}

enum LocationQuerySortProperty {
    DESCRIPTION = "DESCRIPTION"
};
enum LocationQuerySortDirection {
    ASC = "ASC",
    DESC = "DESC"
};
export class LocationQuery {

    @ApiProperty({ required: false, description: "Filter by exact match to Location.id"})
    @IsOptional()
    @IsString({each: true})
    readonly id: string;

    @ApiProperty({ required: false, description: "Filter by substring match to Location.description"})
    @IsOptional()
    @IsString({each: true})
    readonly description: string;

    @ApiProperty({ required: false, description: "Filter by Location.center."})
    @IsOptional()
    @IsBoolean({each: true})
    readonly center: boolean;

    @ApiProperty({ required: false, description: "Number of items per page. Defaults to 10."})
    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({value}) => parseInt(value))
    readonly limit: number = 10;

    @ApiProperty({ required: false, description: "Page number. Starts at zero. Defaults to zero."})
    @IsOptional()
    @IsInt()
    @Min(0)
    @Transform(({value}) => parseInt(value))
    readonly page: number = 0;

    @ApiProperty({ required: false, description: "Sort property name. Defaults to DESCRIPTION. Possible values are DESCRIPTION."})
    @IsOptional()
    @IsEnum(LocationQuerySortProperty, {each: true})
    readonly sortProperty: LocationQuerySortProperty = LocationQuerySortProperty.DESCRIPTION;

    @ApiProperty({ required: false, description: "Sort property order. Use ASC or DESC. Defaults to ASC."})
    @IsOptional()
    @IsEnum(LocationQuerySortDirection, {each: true})
    readonly sortDirection: LocationQuerySortDirection = LocationQuerySortDirection.ASC;

};