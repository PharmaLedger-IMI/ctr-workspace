import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { AppUser } from "./appuser.entity";

@ApiTags('AppUser')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('/ctrial/appuser')
export class AppUserController {
    constructor(private connection: Connection) {}

    @Get()
    @ApiOperation({ summary: 'All AppUsers' })
    async findAll(@Req() req): Promise<AppUser[]> {
        let aTerm = req.query.term;
        console.log("au.findAll ... term=" + aTerm); //jpsl: How do I know that req has .query has .params ????
        let whereOpts = [];
        if (req.query.term) {
            whereOpts = [
                { firstName: Like("%" + aTerm + "%") },
                { lastName: Like("%" + aTerm + "%") },
                { username: Like("%" + aTerm + "%") }
            ];
        }
        let auCollection = await AppUser.find({ where: whereOpts, order: { id: "DESC" } });
        if (auCollection && Array.isArray(auCollection)) {
            auCollection.forEach((au) => {
                delete au.passHash;
            });
        }
        console.log("au.findAll, auCollection =", auCollection);
        return auCollection;
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get one AppUser' })
    @ApiParam({ name: 'id', type: String })
    async findOne(@Param() params): Promise<AppUser> {
        console.log("au.findOne... id=", params.id);
        let au = await AppUser.findOne(params.id);
        if (au) {
            delete au.passHash;
        }
        console.log("au.findOne arc =", au);
        return au;
    }
}

