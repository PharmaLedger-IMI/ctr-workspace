
import { ReadStream } from 'fs';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { ClinicalTrial } from './clinicaltrial.entity';
import { ClinicalTrialQuery } from './clinicaltrialquery.validator';

@EntityRepository(ClinicalTrial)
export class ClinicalTrialRepository extends Repository<ClinicalTrial>  {
    constructor(
    ) {
        super();
    }

    /**
     * Performs a SQL query applying the filters according to the @param
     * @param ctrSearchQuery
     */
     async search(ctrSearchQuery: ClinicalTrialQuery): Promise<{ count: number; query: ClinicalTrialQuery; ctrCollection: any; }> {
        console.log('clinicaltrial.repository.search query=', ctrSearchQuery)

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
            return str
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
            return str;
        }

        // TODO -> add filter by expiryDate & ? option: OR or AND in where ?
        /** NOTE: The name of "whereFunctions" need to be the same name of filter/properties of EventSearchQuery */
        const whereFunctions = {
            id(id: string[] | string): string {
                return `clinicaltrial.id IN (${transformValueToCommaList(id)})`;
            },
            name(str: string[]  | string): string {
                return getJsonWhereFieldLikeStatement('clinicaltrial.dsudata', 'name', str);
            },
            description(str: string[]  | string): string {
                return getJsonWhereFieldLikeStatement('clinicaltrial.dsudata', 'description', str);
            },
            clinicalSiteName(name: string[]  | string): string {
                return transformValueToLikeList("clinicalsite.name", name);
            },
            location(loc: string[]  | string): string {
                return transformValueToLikeList("(address.street||' '||address.postalcode||' '||address.postalcodedesc||' '||country.name)", loc);
            },
        }

        const queryBuilder = await createQueryBuilder(ClinicalTrial, 'clinicaltrial')
        .innerJoinAndSelect('clinicaltrial.clinicalSite', 'clinicalsite')
        .innerJoinAndSelect('clinicalsite.address', 'address')
        .innerJoinAndSelect('address.country', 'country');

        for (let [filterName, filterValue] of Object.entries(ctrSearchQuery)) {
            const whereFilter = whereFunctions[filterName]
            if (!!whereFilter) {
                const whereSql = whereFilter(filterValue);
                console.log(whereSql);
                queryBuilder.andWhere(whereSql);
            }
        }
        console.log(queryBuilder.getSql());
        const count = await queryBuilder.getCount()
        queryBuilder.take(ctrSearchQuery.limit)
        queryBuilder.skip(ctrSearchQuery.page * ctrSearchQuery.limit)

        const ctrCollection = await queryBuilder.getMany()

        return {count, ctrCollection: ctrCollection, query: ctrSearchQuery}
    }
}
