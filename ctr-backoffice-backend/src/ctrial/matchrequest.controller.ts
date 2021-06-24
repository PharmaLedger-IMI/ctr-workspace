import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam, ApiQuery, getSchemaPath, ApiExtraModels, ApiOkResponse } from "@nestjs/swagger";
import { MatchRequest } from './matchrequest.entity';
import { MatchRequestQuery, MatchRequestQueryValidator } from "./matchrequestquery.validator";
import { MatchRequestRepository } from "./matchrequest.repository";
import { PaginatedDto } from "src/paginated.dto";


@ApiExtraModels(PaginatedDto)
@ApiTags('MatchRequest')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/matchrequest')
export class MatchRequestController {

    private mrRepository: MatchRequestRepository;

    constructor(
        private connection: Connection
    ) {
        this.mrRepository = this.connection.getCustomRepository(MatchRequestRepository);
    }

    @Get()
    @ApiOperation({summary: "Search for MatchRequest based on a query, with paginated results."})
    @ApiOkResponse({
        schema: {
            allOf: [
                { $ref: getSchemaPath(PaginatedDto) },
                {
                    properties: {
                        results: {
                            type: 'array',
                            items: { $ref: getSchemaPath(MatchRequest) },
                        },
                    },
                },
            ],
        },
    })
    async search(@Query(MatchRequestQueryValidator) mrQuery: MatchRequestQuery): Promise<PaginatedDto<MatchRequestQuery,MatchRequest>> {
        console.log("matchrequest.controller.search... query=", mrQuery);
        // TODO filter by current user priv.
        const page = await this.mrRepository.search(mrQuery);
        console.log("matchrequest.Search events[0] =", page);
        return page;
    }

    @Get(":keyssi")
    @ApiOperation({ summary: 'Get one matchrequest' })
    @ApiParam({ name: 'keyssi', type: String })
    async findOne(@Param() params): Promise<MatchRequest> {
        console.log("matchrequest.findOne... keyssi=", params.keyssi);
        let mr = await MatchRequest.findOne(params.keyssi);
        console.log("matchrequest.findOne keyssy =", mr);
        return mr;
    }
}

