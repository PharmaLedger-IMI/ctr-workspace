import { Controller, Request, Body, Post, UnauthorizedException, Param, Req, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { MedicalCondition } from '../ctrial/medicalcondition.entity';
import { Connection, FindManyOptions, ILike } from 'typeorm';

@ApiTags("LForm's public (unauthenticated) list services")
@Controller('/lforms')
export class LFormsController {
    constructor(private connection: Connection) { }

    @Get('/medicalconditions')
    @ApiOkResponse({
        description: 'List of active medical conditions in LForms CWE remote JSON format [ code, [array of codes], null, [array of array of descriptions]].',
        schema: {
            type: "object",
        },
    })
    @ApiInternalServerErrorResponse({ description: 'Something failed. Please look at the error message for details.' })
    @ApiQuery({ name: 'term', description: "filter by condition name", required: false })
    @ApiQuery({ name: 'maxList', description: "if present, display all results", required: false })
    async medicalconditions(@Req() req) {

        let aTerms = req.query.terms;
        let aMaxListExists = 'maxList' in req.query;
        console.log("lforms.medicalconditions ... term=" + aTerms, "maxList", aMaxListExists); //jpsl: How do I know that req has .query has .params ????
        let whereOpts = [];
        if (req.query.terms) {
            whereOpts = [
                { name: ILike("%" + aTerms + "%") }
            ];
        }
        let findOpts : FindManyOptions<MedicalCondition> = { where: whereOpts, order: { name: "ASC" } };
        if (!aMaxListExists) {
            findOpts.skip = 0;
            findOpts.take = 10;
        }
        let mcCollection = await MedicalCondition.find(findOpts);
        console.log(`lforms.medicalconditions #${mcCollection.length}... `, mcCollection);
        let mcCode = [];
        let mcName = [];
        mcCollection.forEach((mc) => {
            mcCode.push(mc.code);
            mcName.push([mc.name]);
        });
        let mcResult = [2417, mcCode, null, mcName];
        return mcResult;
    }
}

