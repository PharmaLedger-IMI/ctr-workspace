
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginatedDto } from 'src/paginated.dto';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { Application } from './application.entity';
import { ApplicationQuery } from './applicationquery.validator';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application>  {
    constructor(
    ) {
        super();
    }

    /**
     * Performs a SQL query applying the filters according to the @param
     * @param appSearchQuery
     */
     async search(appSearchQuery: ApplicationQuery): Promise<PaginatedDto<ApplicationQuery,Application>> {
        console.log('application.repository.search query=', appSearchQuery)

        const escapeQuote = (str : string): string => {
            if (typeof str === 'string')
                return str.replace(/'/g, "''");
            else
                return str;
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
            return "( "+str+" )";
        }

        /** NOTE: The name of "whereFunctions" need to be the same name of filter/properties of EventSearchQuery */
        const whereFunctions = {
            name(str: string[]  | string): string {
                return transformValueToLikeList('name', str);
            },
            email(str: string[]  | string): string {
                return transformValueToLikeList('email', str);
            },
            clinicalSiteId(str: string[]  | string): string {
                return `clinicalsite.id IN (${transformValueToCommaList(str)})`;
            },
            clinicalTrialId(str: string[]  | string): string {
                return `clinicaltrial.id IN (${transformValueToCommaList(str)})`;
            },
            sponsorId(str: string[]  | string): string {
                return `sponsor.id IN (${transformValueToCommaList(str)})`;
            }
        }

        const sortProperties = {
            // prop names must match ClinicalTrialQuerySortProperty
            "NAME":          "application.name",
            "EMAIL":         "application.email",
            "SPONSOR": "sponsor.name",
            "CLINICAL_SITE": "clinicalsite.name",
            "CLINICAL_TRIAL": "clinicaltrial.name",
            "CREATED_ON":    "application.createdOn",
        };

        let queryBuilder = await createQueryBuilder(Application, 'application');
        queryBuilder
        .innerJoinAndSelect('application.matchRequest', 'matchrequest')
        .innerJoinAndSelect('application.clinicalSite', 'clinicalsite')
        .innerJoinAndSelect('application.clinicalTrial', 'clinicaltrial')
        .innerJoinAndSelect('clinicaltrial.sponsor', 'sponsor')
        ;

        for (let [filterName, filterValue] of Object.entries(appSearchQuery)) {
            const whereFilter = whereFunctions[filterName]
            if (!!whereFilter) {
                const whereSql = whereFilter(filterValue);
                queryBuilder.andWhere(whereSql);
            }
        }

        const orderByProps = Array.isArray(appSearchQuery.sortProperty) ? appSearchQuery.sortProperty : [appSearchQuery.sortProperty];
        const orderByDirs  = Array.isArray(appSearchQuery.sortDirection) ? appSearchQuery.sortDirection : [appSearchQuery.sortDirection];
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
        queryBuilder.addOrderBy("application.id", "DESC"); // one last sort property to force deterministic output
        console.log(queryBuilder.getSql());
        const count = await queryBuilder.getCount()
        queryBuilder.take(appSearchQuery.limit)
        queryBuilder.skip(appSearchQuery.page * appSearchQuery.limit)

        const rawAndEntities = await queryBuilder.getRawAndEntities();
        console.log("Raw");
        console.log(rawAndEntities);
        const appCollection = rawAndEntities.entities;
        return {count: count, query: appSearchQuery, results: appCollection };
    }
}
