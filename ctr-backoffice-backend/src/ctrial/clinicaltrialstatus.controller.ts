import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

import { ClinicalTrialStatus } from "./clinicaltrialstatus.entity";

@ApiExtraModels(ClinicalTrialStatus)
@ApiTags('ClinicalTrialStatus')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/clinicaltrialstatus')
export class ClinicalTrialStatusController {
    constructor(private connection: Connection) {}

    @Get()
    @ApiOperation({ summary: 'All ClinicalTrialStatus' })
    async findAll(@Req() req): Promise<ClinicalTrialStatus[]> {
        let aTerm = req.query.term;
        console.log("ctrs.findAll ... term=" + aTerm); //jpsl: How do I know that req has .query has .params ????
        let whereOpts = [];
        if (req.query.term) {
            whereOpts = [
                { code: Like("%" + aTerm + "%") },
                { status: Like("%" + aTerm + "%") }
            ];
        }
        let ctrsCollection = await ClinicalTrialStatus.find({ where: whereOpts, order: { description: "ASC" } });
        console.log("ctrs.findAll, ctrsCollection =", ctrsCollection);
        return ctrsCollection;
    }

    @Get(":code")
    @ApiOperation({ summary: 'Get one ClinicalTrialStatus' })
    @ApiParam({ name: 'code', type: String })
    async findOne(@Param() params): Promise<ClinicalTrialStatus> {
        console.log("ctrs.findOne... code=", params.code);
        let ctrs = await ClinicalTrialStatus.findOne(params.code);
        console.log("ctrs.findOne ctrs =", ctrs);
        return ctrs;
    }
}

