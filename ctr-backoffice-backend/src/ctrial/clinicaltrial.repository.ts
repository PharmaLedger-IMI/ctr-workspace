
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginatedDto } from 'src/paginated.dto';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { ClinicalTrial } from './clinicaltrial.entity';
import { ClinicalTrialQuery } from './clinicaltrialquery.validator';
import { Location } from './location.entity';
import { MedicalCondition } from './medicalcondition.entity';

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
     async search(ctrSearchQuery: ClinicalTrialQuery): Promise<PaginatedDto<ClinicalTrialQuery,ClinicalTrial>> {
        console.log('clinicaltrial.repository.search query=', ctrSearchQuery)

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
            id(id: string[] | string): string {
                return `clinicaltrial.id IN (${transformValueToCommaList(id)})`;
            },
            name(str: string[]  | string): string {
                return transformValueToLikeList('clinicaltrial.name', str);
            },
            description(str: string[]  | string): string {
                return transformValueToLikeList('clinicaltrial.description', str);
            },
            status(str: string[] | string): string {
                return `clinicaltrialstatus.code IN (${transformValueToCommaList(str)})`;
            },
            medicalConditionName(str: string[]  | string): string {
                return transformValueToLikeList("medicalcondition.name", str);
            },
            medicalConditionCode(str: string[]  | string): string {
                return `medicalcondition.code IN (${transformValueToCommaList(str)})`;
            },
            clinicalSiteName(str: string[]  | string): string {
                return transformValueToLikeList("clinicalsite.name", str);
            },
        }

        /*
        const sortProperties = {
            "NAME":        "(clinicaltrial.dsuData::jsonb->>name)",
            "DESCRIPTION": "(clinicaltrial.dsuData::jsonb->>description)",
            "SITE_NAME":   "clinicalsite.name",
        };
        */
        const sortProperties = {
            // prop names must match ClinicalTrialQuerySortProperty
            "NAME":         "clinicaltrial.name",
            "DESCRIPTION":  "clinicaltrial.description",
            "SITE_NAME":    "clinicalsite.name",
            "SPONSOR_NAME": "sponsor.name",
            "TRAVEL_DISTANCE": "travdistmiles",
        };

        // travelDistance is a special condition based on several params
        let travelDistanceFlag = false;
        const latitude = ctrSearchQuery.latitude;
        const longitude = ctrSearchQuery.longitude;
        const travelDistance = ctrSearchQuery.travelDistance;
        if (latitude || longitude || travelDistance) {
            if (!latitude || !longitude || !travelDistance)
                throw new HttpException('latitude, longitude and travelDistance must be specified together', HttpStatus.INTERNAL_SERVER_ERROR);
            travelDistanceFlag = true;
        }

        let queryBuilder = await createQueryBuilder(ClinicalTrial, 'clinicaltrial');
        if (travelDistanceFlag)
            queryBuilder.addSelect("point(location.latitude, location.longitude) <@> point("+latitude+", "+longitude+")", "travdistmiles");
        queryBuilder
            .innerJoinAndSelect('clinicaltrial.status', 'clinicaltrialstatus')
            .innerJoinAndSelect('clinicaltrial.clinicalTrialMedicalConditions', 'clinicaltrialmedicalcondition')
            .innerJoinAndSelect('clinicaltrialmedicalcondition.medicalCondition', 'medicalcondition')
            .innerJoinAndSelect('clinicaltrial.clinicalSite', 'clinicalsite')
            .innerJoinAndSelect('clinicaltrial.sponsor', 'sponsor')
            .innerJoinAndSelect('clinicalsite.address', 'address')
            .innerJoinAndSelect('address.country', 'country')
            .innerJoinAndSelect('address.location', 'location');

        for (let [filterName, filterValue] of Object.entries(ctrSearchQuery)) {
            if ("latitude" == filterName // skip geo functions
                || "longitude" == filterName 
                || "travelDistance" == filterName
            )
                continue;
            const whereFilter = whereFunctions[filterName]
            if (!!whereFilter) {
                const whereSql = whereFilter(filterValue);
                queryBuilder.andWhere(whereSql);
            }
        }
        if (travelDistanceFlag) {
            queryBuilder.andWhere("(point(location.latitude, location.longitude) <@> point("+latitude+", "+longitude+")) <= "+travelDistance);
        }
        const orderByProps = Array.isArray(ctrSearchQuery.sortProperty) ? ctrSearchQuery.sortProperty : [ctrSearchQuery.sortProperty];
        const orderByDirs  = Array.isArray(ctrSearchQuery.sortDirection) ? ctrSearchQuery.sortDirection : [ctrSearchQuery.sortDirection];
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
        queryBuilder.addOrderBy("clinicalsite.id", "DESC"); // one last sort property to force deterministic output
        console.log(queryBuilder.getSql());
        const count = await queryBuilder.getCount()
        queryBuilder.take(ctrSearchQuery.limit)
        queryBuilder.skip(ctrSearchQuery.page * ctrSearchQuery.limit)

        const rawAndEntities = await queryBuilder.getRawAndEntities();
        console.log("Raw");
        console.log(rawAndEntities);
        const ctrCollection = rawAndEntities.entities;
        if (travelDistanceFlag) {
            ctrCollection.forEach((ctr, index) => {
                ctr.travDistMiles = rawAndEntities.raw[index].travdistmiles;
            });
        }
        return {count: count, query: ctrSearchQuery, results: ctrCollection };
    }
}
