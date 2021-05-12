import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam } from "@nestjs/swagger";
import { ClinicalTrial } from './clinicaltrial.entity';

@ApiTags('ClinicalTrial')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('/ctrial/clinicaltrial')
export class ClinicalTrialController {
    constructor(private connection: Connection) {}

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

