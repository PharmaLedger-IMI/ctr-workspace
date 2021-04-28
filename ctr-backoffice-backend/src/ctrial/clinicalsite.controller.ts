import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { ClinicalSite } from "./clinicalsite.entity";

@ApiTags('ClinicalSite')
@Controller('/ctrial/clinicalsite')
export class ClinicalSiteController {
    constructor(private connection: Connection) {}

    @Get()
    @ApiOperation({ summary: 'All ClinicalSites' })
    async findAll(@Req() req): Promise<ClinicalSite[]> {
        let aTerm = req.query.term;
        console.log("cs.findAll ... term=" + aTerm); //jpsl: How do I know that req has .query has .params ????
        let whereOpts = [];
        if (req.query.term) {
            whereOpts = [
                { name: Like("%" + aTerm + "%") }
            ];
        }
        let csCollection = await ClinicalSite.find({ where: whereOpts, order: { id: "ASC" } });
        console.log("cs.findAll, csCollection =", csCollection);
        return csCollection;
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get(":id")
    @ApiOperation({ summary: 'Get one ClinicalSite' })
    async findOne(@Param() params): Promise<ClinicalSite> {
        console.log("cs.findOne... id=", params.id);
        let cs = await ClinicalSite.findOne(+params.id);
        console.log("cs.findOne cs =", cs);
        return cs;
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Put() // update all fields ???
    @ApiOperation({ summary: 'Create/Update one ClinicalSite' })
    async update(@Body() cs: ClinicalSite): Promise<ClinicalSite> {
        console.log("cs.update... cs=", cs);
        // jpsl: Could not do cs.save(). Using repository.
        const csRepository = this.connection.getRepository(ClinicalSite);
        await csRepository.save(cs); // autocommit is good enough ?
        console.log("cs.update DB connection closed, cs =", cs);
        return cs;
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post() // update all fields ???
    @ApiOperation({ summary: 'Create/Update one ClinicalSite' })
    async add(@Body() cs: ClinicalSite): Promise<ClinicalSite> {
        console.log("cs.add... cs=", cs);
        // jpsl: Could not do cs.save(). Using repository.
        const csRepository = this.connection.getRepository(ClinicalSite);
        await csRepository.save(cs); // autocommit is good enough ?
        console.log("cs.add, cs =", cs);
        return cs;
    }


    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Delete(":id")
    @ApiOperation({ summary: 'Delete one ClinicalSite' })
    async delete(@Param() params): Promise<void> {
        console.log("cs.delete... id=", params.id);
        const csRepository = this.connection.getRepository(ClinicalSite);
        const delResult = await csRepository.delete(params.id); // autocommit is good enough ?
        console.log("cs.delete, cs =", delResult.raw);
        return;
    }
}

