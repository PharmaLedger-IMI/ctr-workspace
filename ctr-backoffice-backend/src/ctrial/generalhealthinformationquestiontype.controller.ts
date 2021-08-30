import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { GeneralHealthInformationQuestionType } from './generalhealthinformationquestiontype.entity';
import { QuestionType } from "./questiontype.entity";

@ApiTags('GeneralHealthInformationQuestionType')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/generalhealthinformationquestiontype')
export class GeneralHealthInformationQuestionTypeController {
    constructor(private connection: Connection) {}

    @Get()
    @ApiOperation({ summary: 'Get the definition QuestionType[] for all GeneralHealthInformationQuestionType records sorted by the order the questions should appear in the GeneralHealthInformation form' })
    @ApiOkResponse({
        description: 'Array of QuestionType object sorted by display order',
        type: QuestionType,
        isArray: true
    })
    async findAll(@Req() req): Promise<QuestionType[]> {
        console.log("GhiQt.findAll");
        let whereOpts = [];
        let ghiQtCollection = await GeneralHealthInformationQuestionType.find({ where: whereOpts, order: { ordering: "ASC" } });
        const qtCollection = [];
        ghiQtCollection.forEach( (mcQt) => {
            qtCollection.push(mcQt.questionType);
        });
        console.log("GhiQt.findAll, qtCollection =", qtCollection);
        return qtCollection;
    }

}

