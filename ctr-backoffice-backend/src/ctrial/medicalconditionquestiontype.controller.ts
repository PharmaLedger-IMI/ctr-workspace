import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { MedicalConditionQuestionType } from './medicalconditionquestiontype.entity';

@ApiTags('MedicalConditionQuestionType')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/medicalconditionquestiontype')
export class MedicalConditionQuestionTypeController {
    constructor(private connection: Connection) {}

    @Get()
    @ApiOperation({ summary: 'All MedicalConditionQuestionType records sorted by the order it should appear in the condition (stage=30) questions' })
    async findAll(@Req() req): Promise<MedicalConditionQuestionType[]> {
        console.log("McQt.findAll");
        let whereOpts = [];
        let mcQtCollection = await MedicalConditionQuestionType.find({ where: whereOpts, order: { ordering: "ASC" } });
        console.log("McQt.findAll, mcQtCollection =", mcQtCollection);
        return mcQtCollection;
    }

}

