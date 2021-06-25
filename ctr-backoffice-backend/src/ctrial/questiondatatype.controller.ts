import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { QuestionDataType } from './questiondatatype.entity';

@ApiTags('QuestionDataType')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/questiondatatype')
export class QuestionDataTypeController {
    constructor(private connection: Connection) {}

    @Get()
    @ApiOperation({ summary: 'All QuestionDataType (non-paged)' })
    @ApiOkResponse({
        description: "Array of QuestionDataType",
        type: [QuestionDataType],
    })
    async findAll(@Req() req): Promise<QuestionDataType[]> {
        let aTerm = req.query.term;
        console.log("qdt.findAll ... term=" + aTerm); //jpsl: How do I know that req has .query has .params ????
        let whereOpts = [];
        if (req.query.term) {
            whereOpts = [
                { code: Like("%" + aTerm + "%") },
            ];
        }
        let qdtCollection = await QuestionDataType.find({ where: whereOpts, order: { code: "ASC" } });
        console.log("qdt.findAll, qdtCollection =", qdtCollection);
        return qdtCollection;
    }
}

