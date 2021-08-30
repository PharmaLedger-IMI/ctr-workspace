import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { MedicalConditionQuestionType } from './medicalconditionquestiontype.entity';
import { QuestionType } from "./questiontype.entity";

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

    @Get(":mcCode")
    @ApiOperation({summary: "Get the definition QuestionType[] of the condition-specific question's for a given MedicalCondition.code."})
    @ApiParam({ name: 'mcCode', type: Number })
    @ApiOkResponse({
        description: 'Array of QuestionType object sorted by display order',
        type: QuestionType,
        isArray: true
    })
    async getCondition(@Param('mcCode') mcCode: number): Promise<QuestionType[]> {
        console.log("mcqt.getCondition... mcCode=", mcCode);
        let whereOpts = [ { medicalCondition: { code: mcCode } }];
        const mcQtCollection = await MedicalConditionQuestionType.find({ where: whereOpts, order: { ordering: "ASC" } });
        const qtCollection = [];
        mcQtCollection.forEach( (mcQt) => {
            qtCollection.push(mcQt.questionType);
        });
        console.log("McQt.getCondition, qtCollection =", qtCollection);
        return qtCollection;
    }

}

