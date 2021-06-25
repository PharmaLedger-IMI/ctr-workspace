import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { QuestionType } from './questiontype.entity';

@ApiTags('QuestionType')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/questiontype')
export class QuestionTypeController {
    constructor(private connection: Connection) {}

    @Get()
    @ApiOperation({ summary: 'All QuestionType (non-paged)' })
    @ApiOkResponse({
        description: "Array of QuestionType",
        type: [QuestionType],
    })
    async findAll(@Req() req): Promise<QuestionType[]> {
        let aTerm = req.query.term;
        console.log("qt.findAll ... term=" + aTerm); //jpsl: How do I know that req has .query has .params ????
        let whereOpts = [];
        if (req.query.term) {
            whereOpts = [
                { localQuestionCode: Like("%" + aTerm + "%") },
            ];
        }
        let qtCollection = await QuestionType.find({ where: whereOpts, order: { localQuestionCode: "ASC" } });
        console.log("qt.findAll, qtCollection =", qtCollection);
        return qtCollection;
    }
}

