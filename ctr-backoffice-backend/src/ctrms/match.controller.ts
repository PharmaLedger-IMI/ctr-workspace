import { Controller, Request, Body, Post, UnauthorizedException, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from "@nestjs/swagger";
import { ClinicalTrial } from 'src/ctrial/clinicaltrial.entity';
import { ClinicalTrialQuery } from 'src/ctrial/clinicaltrialquery.validator';
import { PaginatedDto } from 'src/paginated.dto';
import { MatchService } from "./match.service";

@ApiTags('CTR Match Service')
@Controller('/ctrms')
export class MatchController {
    constructor(
        private matchService: MatchService) { }

    @Post('/trialFind')
    @ApiBody({ type: Object })
    @ApiOkResponse({
        schema: {
            allOf: [
                { $ref: getSchemaPath(PaginatedDto) },
                {
                    properties: {
                        results: {
                            type: 'array',
                            items: { $ref: getSchemaPath(ClinicalTrial) },
                        },
                    },
                },
            ],
        },
    })
    @ApiInternalServerErrorResponse({ description: 'Something failed. Please look at the error message for details.' })
    async trialFind(@Request() req: any) : Promise<PaginatedDto<ClinicalTrialQuery,ClinicalTrial>> {
        let auDb = req.user;
        console.log("/ctrms/trialFind req.body =", req.body);
        let res = await this.matchService.trialFind(req.body);
        console.log("/ctrms/trialFind res =", res);
        return res;
    }

    @Post('/trialPrefs')
    @ApiBody({ type: Object })
    @ApiOkResponse({
        description: 'Submit trial preferences, and get back the rest of the forms.',
        schema: {
            type: "object",
        },
    })
    @ApiInternalServerErrorResponse({ description: 'Something failed. Please look at the error message for details.' })
    async trialPrefs(@Body() msData: any, @Request() req: any) {
        let auDb = req.user;
        console.log("/ctrms/trialPrefs req.body =", req.body);
        let res = await this.matchService.trialPrefs(req.body);
        console.log("/ctrms/trialPrefs res =", res);
        return res;
    }

    @Post('/submit')
    @ApiBody({ type: Object })
    @ApiOkResponse({
        description: 'Submit a match request.',
        schema: {
            type: "object",
        },
    })
    @ApiInternalServerErrorResponse({ description: 'Something failed. Please look at the error message for details.' })
    async submit(@Body() msData: any, @Request() req: any) {
        let auDb = req.user;
        console.log("/ctrms/submit req.body =", req.body);
        let res = this.matchService.submit(req.body);
        console.log("/ctrms/submit res =", res);
        return res;
    }
}

