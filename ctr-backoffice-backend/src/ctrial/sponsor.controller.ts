import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { Sponsor } from "./sponsor.entity";

@ApiTags('Sponsor')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('/ctrial/sponsor')
export class SponsorController {
    constructor(private connection: Connection) {}

    @Get()
    @ApiOperation({ summary: 'All Sponsors' })
    async findAll(@Req() req): Promise<Sponsor[]> {
        let aTerm = req.query.term;
        console.log("sp.findAll ... term=" + aTerm); //jpsl: How do I know that req has .query has .params ????
        let whereOpts = [];
        if (req.query.term) {
            whereOpts = [
                { name: Like("%" + aTerm + "%") }
            ];
        }
        let spCollection = await Sponsor.find({ where: whereOpts, order: { id: "ASC" } });
        console.log("sp.findAll, spCollection =", spCollection);
        return spCollection;
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get one Sponsor' })
    async findOne(@Param() params): Promise<Sponsor> {
        console.log("sp.findOne... id=", params.id);
        let sp = await Sponsor.findOne(+params.id);
        console.log("sp.findOne sp =", sp);
        return sp;
    }

    @Put() // update all fields ???
    @ApiOperation({ summary: 'Create/Update one Sponsor' })
    async update(@Body() sp: Sponsor): Promise<Sponsor> {
        console.log("sp.update... sp=", sp);
        // jpsl: Could not do sp.save(). Using repository.
        const spRepository = this.connection.getRepository(Sponsor);
        await spRepository.save(sp); // autocommit is good enough ?
        console.log("sp.update DB connection closed, sp =", sp);
        return sp;
    }

    @Post() // update all fields ???
    @ApiOperation({ summary: 'Create/Update one Sponsor' })
    async add(@Body() sp: Sponsor): Promise<Sponsor> {
        console.log("sp.add... sp=", sp);
        // jpsl: Could not do sp.save(). Using repository.
        const spRepository = this.connection.getRepository(Sponsor);
        await spRepository.save(sp); // autocommit is good enough ?
        console.log("sp.add, sp =", sp);
        return sp;
    }


    @Delete(":id")
    @ApiOperation({ summary: 'Delete one Sponsor' })
    async delete(@Param() params): Promise<void> {
        console.log("sp.delete... id=", params.id);
        const spRepository = this.connection.getRepository(Sponsor);
        const delResult = await spRepository.delete(params.id); // autocommit is good enough ?
        console.log("sp.delete, sp =", delResult.raw);
        return;
    }
}

