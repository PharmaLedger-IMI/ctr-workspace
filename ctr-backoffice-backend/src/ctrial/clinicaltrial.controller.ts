import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam } from "@nestjs/swagger";
import { ClinicalTrial } from './clinicaltrial.entity';
import { ClinicalTrialQuery, ClinicalTrialQueryValidator } from "./clinicaltrialquery.validator";
import { ClinicalTrialRepository } from "./clinicaltrial.repository";

@ApiTags('ClinicalTrial')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/clinicaltrial')
export class ClinicalTrialController {

    private ctrRepository: ClinicalTrialRepository;

    constructor(
        private connection: Connection
    ) {
        this.ctrRepository = this.connection.getCustomRepository(ClinicalTrialRepository);
    }

    @Get()
    @ApiOperation({ summary: 'All clinical trials' })
    async findAll(@Req() req): Promise<ClinicalTrial[]> {
        let aTerm = req.query.term;
        console.log("ct.findAll ... term=" + aTerm); //jpsl: How do I know that req has .query has .params ????
        let whereOpts = [];
        if (req.query.term) {
            whereOpts = [
                { dsuData: Like("%" + aTerm + "%") }
            ];
        }
        let ctCollection = await ClinicalTrial.find({ where: whereOpts, order: { id: "ASC" } });
        console.log("ct.findAll, ctCollection =", ctCollection);
        return ctCollection;
    }

    @Get("search")
    @ApiOperation({summary: "Search for ClinicalTrials based on a query"})
    async search(@Query(ClinicalTrialQueryValidator) ctrQuery: ClinicalTrialQuery): Promise<object> {
        console.log("clinicaltrial.controller.search... query=", ctrQuery);
        const {ctrCollection, count, query} = await this.ctrRepository.search(ctrQuery);
        console.log("clinicaltrial.Search events[0] =", ctrCollection[0]);
        return {
            meta: {
                itemsCount: count,
                itemsPerPage: ctrQuery.limit,
                currentPage: ctrQuery.page,
                totalPages: Math.ceil(count / ctrQuery.limit),
            },
            query,
            items: ctrCollection
        }
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get one clinical trial' })
    @ApiParam({ name: 'id', type: String })
    async findOne(@Param() params): Promise<ClinicalTrial> {
        console.log("ct.findOne... id=", params.id);
        let ct = await ClinicalTrial.findOne(params.id);
        console.log("ct.findOne arc =", ct);
        return ct;
    }
}

