import { Connection, Like, MssqlParameter } from "typeorm";
import { Controller, InternalServerErrorException, Req, Delete, Get, Put, Param, Body, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam, ApiQuery, getSchemaPath, ApiExtraModels, ApiOkResponse } from "@nestjs/swagger";
import { MatchRequest } from './matchrequest.entity';
import { MatchRequestQuery, MatchRequestQueryValidator } from "./matchrequestquery.validator";
import { MatchRequestRepository } from "./matchrequest.repository";
import { PaginatedDto } from "../paginated.dto";
import { MatchRequestService } from "./matchrequest.service";
//import { LFormsService } from "src/lforms/lforms.service";


@ApiExtraModels(PaginatedDto)
@ApiTags('MatchRequest')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/matchrequest')
export class MatchRequestController {

    private mrRepository: MatchRequestRepository;

    constructor(
        private connection: Connection,
        private mrService: MatchRequestService
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
    @ApiParam({ name: 'keyssi', type: String , description: "If it starts with a leading '_' then criteria information is added."})
    async findOne(@Param() params): Promise<MatchRequest> {
        console.log("matchrequest.findOne... keyssi=", params.keyssi);

        let keySSI : string = params.keyssi;
        let showCriteria : boolean = false;
        if (keySSI && keySSI.startsWith("_")) {
            showCriteria = true;
            keySSI = keySSI.substring(1);
        }

        let mr = undefined;
        try {
            mr = await MatchRequest.findOneOrFail(keySSI);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        if (showCriteria) {
            await this.mrService.enrichFormsWithCriteria(mr);
        }

        console.log("matchrequest.findOne keyssi =", mr);
        return mr;
    }
}

