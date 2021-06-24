import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common"
import {IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min, validate} from "class-validator"
import {plainToClass, Transform} from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

@Injectable()
export class MatchRequestQueryValidator implements PipeTransform<MatchRequestQuery> {
    async transform(value: object, metadata: ArgumentMetadata): Promise<MatchRequestQuery> {
        console.log('matchrequestquery.validator.transform raw=', value)
        const search = plainToClass(metadata.metatype, value)
        const errors = await validate(search, {skipMissingProperties: false, whitelist: true, transform: true})
        if (errors.length > 0) {
            const message = Object.values(errors[0].constraints).join(". ").trim()
            throw new BadRequestException(message)
        }
        console.log('matchrequestquery.validator.transform return=', search)
        return search
    }
}

enum MatchRequestQuerySortProperty {
    CREATEDON = "CREATEDON"
};
enum MatchRequestQuerySortDirection {
    ASC = "ASC",
    DESC = "DESC"
};
export class MatchRequestQuery {

    @ApiProperty({
        name: 'createdOnStart',
        required: false,
        type: Date,
        isArray: false,
        example: '2020-06-12T16:52:38.696Z',
        description: "Filter by greater or equal to matchRequest.createdOn"
    })
    @IsOptional()
    @IsDateString()
    readonly createdOnStart: Date

    @ApiProperty({
        name: 'createdOnEnd',
        required: false,
        type: Date,
        isArray: false,
        example: '2029-06-15T16:52:38.696Z',
        description: "Filter by less or equal to matchRequest.createdOn"
    })
    @IsOptional()
    @IsDateString()
    readonly createdOnEnd: Date

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

    @ApiProperty({ required: false, description: "Sort property name. Defaults to NAME. Possible values are NAME, DESCRIPTION, SITE_NAME, SPONSOR_NAME, TRAVEL_DISTANCE."})
    @IsOptional()
    @IsEnum(MatchRequestQuerySortProperty, {each: true})
    readonly sortProperty: MatchRequestQuerySortProperty = MatchRequestQuerySortProperty.CREATEDON;

    @ApiProperty({ required: false, description: "Sort property order. Use ASC or DESC. Defaults to DESC."})
    @IsOptional()
    @IsEnum(MatchRequestQuerySortDirection, {each: true})
    readonly sortDirection: MatchRequestQuerySortDirection = MatchRequestQuerySortDirection.DESC;

};