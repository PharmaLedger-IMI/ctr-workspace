import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { MedicalCondition } from './medicalcondition.entity';

@ApiTags('MedicalCondition')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/medicalcondition')
export class MedicalConditionController {
    constructor(private connection: Connection) {}

    @Get()
    @ApiOperation({ summary: 'All MedicalConditions (non-paged)' })
    @ApiOkResponse({
        description: "Array of MedicalConditions",
        type: [MedicalCondition],
    })
    async findAll(@Req() req): Promise<MedicalCondition[]> {
        let aTerm = req.query.term;
        console.log("mc.findAll ... term=" + aTerm); //jpsl: How do I know that req has .query has .params ????
        let whereOpts = [];
        if (req.query.term) {
            whereOpts = [
                { name: Like("%" + aTerm + "%") },
            ];
        }
        let mcCollection = await MedicalCondition.find({ where: whereOpts, order: { name: "ASC" } });
        console.log("mc.findAll, mcCollection =", mcCollection);
        return mcCollection;
    }

    @Get("/questiontype")
    @ApiOperation({ summary: 'All MedicalConditions (non-paged) that have at least one reference from MedicalConditionQuestionType' })
    @ApiOkResponse({
        description: "Array of MedicalConditions",
        type: [MedicalCondition],
    })
    async findAllWithQuestionType(@Req() req): Promise<MedicalCondition[]> {
        console.log("mc.findAllWithQuestionType");
        const q = this.connection
            .createQueryBuilder()
            .select("Mc")
            .from(MedicalCondition, "Mc")
            .where("EXISTS (SELECT Mcqt.id FROM MedicalConditionQuestionType Mcqt WHERE Mcqt.medicalCondition=Mc.code)")
            .orderBy("Mc.name");
        console.log(q.getSql());
        let mcCollection = await q.getMany();
        console.log("mc.findAllWithQuestionType, mcCollection =", mcCollection);
        return mcCollection;
    }
}

