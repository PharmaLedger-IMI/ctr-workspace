import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { GeneralHealthInformationQuestionType } from './generalhealthinformationquestiontype.entity';

@ApiTags('GeneralHealthInformationQuestionType')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/generalhealthinformationquestiontype')
export class GeneralHealthInformationQuestionTypeController {
    constructor(private connection: Connection) {}

    @Get()
    @ApiOperation({ summary: 'All GeneralHealthInformationQuestionType records sorted by the order the questions should appear in the GeneralHealthInformation form' })
    async findAll(@Req() req): Promise<GeneralHealthInformationQuestionType[]> {
        console.log("GhiQt.findAll");
        let whereOpts = [];
        let ghiQtCollection = await GeneralHealthInformationQuestionType.find({ where: whereOpts, order: { ordering: "ASC" } });
        console.log("GhiQt.findAll, ghiQtCollection =", ghiQtCollection);
        return ghiQtCollection;
    }

}

