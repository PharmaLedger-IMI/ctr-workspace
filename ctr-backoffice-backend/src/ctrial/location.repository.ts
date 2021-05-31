
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginatedDto } from 'src/paginated.dto';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { Location } from './location.entity';
import { LocationQuery } from './locationquery.validator';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location>  {
    constructor(
    ) {
        super();
    }

    /**
     * Performs a SQL query applying the filters according to the @param
     * @param locSearchQuery
     */
     async search(locSearchQuery: LocationQuery): Promise<PaginatedDto<LocationQuery,Location>> {
        console.log('location.repository.search query=', locSearchQuery)

        const escapeQuote = (str : string): string => {
            return str.replace(/'/g, "''");
        };

        const transformValueToCommaList = (arr: string[] | string): string => {
            arr = Array.isArray(arr) ? arr : [arr]
            return arr.map(value => `'${escapeQuote(value)}'`).join(',');
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
            return str;
        }

        const transformValueToBooleanList = (fieldName: string, value: boolean[] | boolean): string => {
            const values = Array.isArray(value) ? value : [value];
            let str = '';
            let sep = '';
            values.forEach((value: boolean, index: number) => {
                str += sep;
                str += `${fieldName} == '${value ? 't' : 'f'}'`;
                sep = ' OR ';
            });
            return str;
        }

        // TODO -> add filter by expiryDate & ? option: OR or AND in where ?
        /** NOTE: The name of "whereFunctions" need to be the same name of filter/properties of EventSearchQuery */
        const whereFunctions = {
            id(id: string[] | string): string {
                return `location.id IN (${transformValueToCommaList(id)})`;
            },
            description(str: string[]  | string): string {
                return transformValueToLikeList("location.description", str);
            },
            center(aBool: boolean[]  | boolean): string {
                return transformValueToBooleanList("location.center", aBool);
            },
        }
    
        const sortProperties = {
            "DESCRIPTION":  "location.description",
        };

        const queryBuilder = await createQueryBuilder(Location, 'location');

        for (let [filterName, filterValue] of Object.entries(locSearchQuery)) {
            const whereFilter = whereFunctions[filterName]
            if (!!whereFilter) {
                const whereSql = whereFilter(filterValue);
                console.log(whereSql);
                queryBuilder.andWhere(whereSql);
            }
        }
        const orderByProps     = Array.isArray(locSearchQuery.sortProperty) ? locSearchQuery.sortProperty : [locSearchQuery.sortProperty];
        const orderByDirs = Array.isArray(locSearchQuery.sortDirection) ? locSearchQuery.sortDirection : [locSearchQuery.sortDirection];
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
        queryBuilder.addOrderBy("location.id", "DESC"); // one last sort property to force deterministic output
        console.log(queryBuilder.getSql());
        const count = await queryBuilder.getCount()
        queryBuilder.take(locSearchQuery.limit)
        queryBuilder.skip(locSearchQuery.page * locSearchQuery.limit)

        const locCollection = await queryBuilder.getMany()

        return {count: count, query: locSearchQuery, results: locCollection };
    }
}
