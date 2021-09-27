import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam, ApiQuery, getSchemaPath, ApiExtraModels, ApiOkResponse } from "@nestjs/swagger";
import { Application } from './application.entity';
import { ApplicationQuery, ApplicationQueryValidator } from "./applicationquery.validator";
import { ApplicationService } from './application.service';
import { ApplicationRepository } from "./application.repository";
import { PaginatedDto } from "../paginated.dto";


@ApiExtraModels(PaginatedDto)
@ApiTags('Application')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/application')
export class ApplicationController {

    private appRepository: ApplicationRepository;

    constructor(
        private connection: Connection,
        private appService: ApplicationService
    ) {
        this.appRepository = this.connection.getCustomRepository(ApplicationRepository);
    }

    @Get()
    @ApiOperation({summary: "Search for patient's applications based on a query, with paginated results."})
    @ApiOkResponse({
        schema: {
            allOf: [
                { $ref: getSchemaPath(PaginatedDto) },
                {
                    properties: {
                        results: {
                            type: 'array',
                            items: { $ref: getSchemaPath(Application) },
                        },
                    },
                },
            ],
        },
    })
    async search(@Query(ApplicationQueryValidator) appQuery: ApplicationQuery): Promise<PaginatedDto<ApplicationQuery,Application>> {
        console.log("application.search... query=", appQuery);
        const page = await this.appRepository.search(appQuery);
        console.log("application.Search events[0] =", page);
        return page;
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get one Application' })
    @ApiParam({ name: 'id', type: String })
    async findOne(@Param() params): Promise<Application> {
        console.log("application.findOne... id=", params.id);
        // TODO security ? Check JWT identity.
        let app = await this.appRepository.findOneOrFail(params.id);
        console.log("application.findOne app =", app);
        return app;
    }

}

