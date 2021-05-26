import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam, ApiQuery, getSchemaPath, ApiExtraModels, ApiOkResponse } from "@nestjs/swagger";
import { ClinicalTrial } from './clinicaltrial.entity';
import { ClinicalTrialQuery, ClinicalTrialQueryValidator } from "./clinicaltrialquery.validator";
import { ClinicalTrialRepository } from "./clinicaltrial.repository";
import { PaginatedDto } from "src/paginated.dto";


@ApiExtraModels(PaginatedDto)
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
    @ApiOkResponse({
        schema: {
            allOf: [
                { $ref: getSchemaPath(PaginatedDto) },
                {
                    properties: {
                        results: {
                            type: 'array',
                            items: { $ref: getSchemaPath(ClinicalTrial) },
                        },
                    },
                },
            ],
        },
    })
    async search(@Query(ClinicalTrialQueryValidator) ctrQuery: ClinicalTrialQuery): Promise<PaginatedDto<ClinicalTrialQuery,ClinicalTrial>> {
        console.log("clinicaltrial.controller.search... query=", ctrQuery);
        const page = await this.ctrRepository.search(ctrQuery);
        console.log("clinicaltrial.Search events[0] =", page);
        return page;
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

    @Put() // update all fields ???
    @ApiOperation({ summary: 'Create/Update one ClinicalTrial' })
    async update(@Body() ctr: ClinicalTrial): Promise<ClinicalTrial> {
        console.log("ctr.update... ctr=", ctr);
        // jpsl: Could not do arc.save(). Using repository.
        const ctrRepository = this.connection.getRepository(ClinicalTrial);
        await ctrRepository.save(ctr); // autocommit is good enough ?
        console.log("ctr.update DB connection closed, ctr =", ctr);
        return ctr;
    }
}

