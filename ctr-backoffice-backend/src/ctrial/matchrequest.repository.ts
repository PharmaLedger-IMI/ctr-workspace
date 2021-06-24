
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginatedDto } from 'src/paginated.dto';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { MatchRequestQuery } from './matchrequestquery.validator';
import { MatchRequest } from './matchrequest.entity';

@EntityRepository(MatchRequest)
export class MatchRequestRepository extends Repository<MatchRequest>  {
    constructor(
    ) {
        super();
    }

    /**
     * Performs a SQL query applying the filters according to the @param
     * @param mrSearchQuery
     */
     async search(mrSearchQuery: MatchRequestQuery): Promise<PaginatedDto<MatchRequestQuery,MatchRequest>> {
        console.log('matchrequest.repository.search query=', mrSearchQuery)

        const escapeQuote = (str : string): string => {
            return str.replace(/'/g, "''");
        };

        const transformValueToCommaList = (arr: string[] | string): string => {
            arr = Array.isArray(arr) ? arr : [arr]
            return arr.map(value => `'${escapeQuote(value)}'`).join(',');
        }

        const transformValueToEqualOrList = (fieldName: string, arr: string[] | string): string => {
            arr = Array.isArray(arr) ? arr : [arr]
            return "("+arr.map(value => `${fieldName} = '${escapeQuote(value)}'`).join(' OR ')+")";
        }

        const transformValueToLikeList = (fieldName: string, value: string[] | string): string => {
            const values = Array.isArray(value) ? value : [value];
            let str = '';
            let sep = '';
            values.forEach((value: string, index: number) => {
                str += sep;
                str += `${fieldName} ILIKE '%${escapeQuote(value)}%'`;
                sep = ' OR ';
            });
            return "( "+str+" )";
        }

        const getJsonWhereStatement = (fieldName: string, jsonProperty: string, values: string[] | string): string => {
            values = Array.isArray(values) ? values : [values]
            let str = ''
            values.forEach((value: string, index: number) => {
                if (index == 0) {
                    str += `${fieldName} ::jsonb @> \'{"${jsonProperty}":"${escapeQuote(value)}"}\'`
                } else {
                    str += `OR ${fieldName} ::jsonb @> \'{"${jsonProperty}":"${escapeQuote(value)}"}\'`
                }
            })
            return "( "+str+" )";
        }

        const getJsonWhereFieldLikeStatement = (fieldName: string, jsonProperty: string, values: string[] | string): string => {
            values = Array.isArray(values) ? values : [values];
            let str = '';
            let sep = '';
            values.forEach((value: string, index: number) => {
                str += sep;
                str += `${fieldName}::jsonb->>'${jsonProperty}' ILIKE '%${escapeQuote(value)}%'`;
                sep = ' OR ';
            });
            return "( "+str+" )";
        }

        // TODO -> add filter by expiryDate & ? option: OR or AND in where ?
        /** NOTE: The name of "whereFunctions" need to be the same name of filter/properties of EventSearchQuery */
        const whereFunctions = {
            createdOnStart(date: string): string {
                return `matchrequest.createdOn >= '${escapeQuote(date)}'`;
            },
            createdOnEnd(date: string): string {
                return `matchrequest.createdOn <= '${escapeQuote(date)}'`;
            },
        }

        /*
        const sortProperties = {
            "NAME":        "(matchrequest.dsuData::jsonb->>name)",
            "SITE_NAME":   "clinicalsite.name",
        };
        */
        const sortProperties = {
            // prop names must match MatchRequestQuerySortProperty
            "CREATEDON":         "matchrequest.createdOn"
        };

        // travelDistance is a special condition based on several params
        let queryBuilder = await createQueryBuilder(MatchRequest, 'matchrequest');

        for (let [filterName, filterValue] of Object.entries(mrSearchQuery)) {
            const whereFilter = whereFunctions[filterName]
            if (!!whereFilter) {
                const whereSql = whereFilter(filterValue);
                queryBuilder.andWhere(whereSql);
            }
        }
        const orderByProps = Array.isArray(mrSearchQuery.sortProperty) ? mrSearchQuery.sortProperty : [mrSearchQuery.sortProperty];
        const orderByDirs  = Array.isArray(mrSearchQuery.sortDirection) ? mrSearchQuery.sortDirection : [mrSearchQuery.sortDirection];
        if (orderByProps.length != orderByDirs.length) {
            throw new HttpException('sortProperty and sortDirection must have the sane number of values', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        let i: number = 0;
        for(i = 0; i<orderByProps.length; i++) {
            const orderByProp = orderByProps[i];
            const sortProp = sortProperties[orderByProp];
            if (!sortProp) {
                throw new HttpException('sortProperty value unsupported. See possible values.', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const orderByDir = orderByDirs[i];
            queryBuilder.addOrderBy(sortProp, orderByDir);
        }
        //queryBuilder.addOrderBy("matchrequest.id", "DESC"); // one last sort property to force deterministic output
        console.log(queryBuilder.getSql());
        const count = await queryBuilder.getCount()
        queryBuilder.take(mrSearchQuery.limit)
        queryBuilder.skip(mrSearchQuery.page * mrSearchQuery.limit)

        const mrCollection = await queryBuilder.getMany()

        return {count: count, query: mrSearchQuery, results: mrCollection };
    }
}
