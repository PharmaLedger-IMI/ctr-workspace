import { Controller, Request, Body, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { MatchService } from "./match.service";

@ApiTags('CTR Match Service')
@Controller('/ctrms')
export class MatchController {
    constructor(
        private matchService: MatchService) { }

    @Post('/submit')
    @ApiOkResponse({
        description: 'Submit a match request.',
        schema: {
            type: "object",
        },
    })
    @ApiInternalServerErrorResponse({ description: 'Something failed. Please look at the error message for details.' })
    async submit(@Request() req: any) {
        let auDb = req.user;
        console.log("/ctrms/submit req.body =", req.body);
        let res = this.matchService.submit(req.body);
        console.log("/ctrms/submit res =", res);
        return res;
    }
}

