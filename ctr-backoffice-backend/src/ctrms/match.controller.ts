import { Controller, Request, Body, Post, UnauthorizedException, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { MatchService } from "./match.service";

@ApiTags('CTR Match Service')
@Controller('/ctrms')
export class MatchController {
    constructor(
        private matchService: MatchService) { }

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
        let res = this.matchService.trialPrefs(req.body);
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

