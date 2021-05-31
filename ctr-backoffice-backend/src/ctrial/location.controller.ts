import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { Location } from './location.entity';
import { PaginatedDto } from "src/paginated.dto";
import { LocationQuery, LocationQueryValidator } from "./locationquery.validator";
import { LocationRepository } from "./location.repository";

@ApiTags('Location')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/location')
export class LocationController {

    private locRepository: LocationRepository;

    constructor(private connection: Connection) {
        this.locRepository = this.connection.getCustomRepository(LocationRepository);
    }

    @Get()
    @ApiOperation({summary: "Search for Location based on a query"})
    @ApiOkResponse({
        schema: {
            allOf: [
                { $ref: getSchemaPath(PaginatedDto) },
                {
                    properties: {
                        results: {
                            type: 'array',
                            items: { $ref: getSchemaPath(Location) },
                        },
                    },
                },
            ],
        },
    })
    async search(@Query(LocationQueryValidator) locQuery: LocationQuery): Promise<PaginatedDto<LocationQuery,Location>> {
        console.log("location.controller.search... query=", locQuery);
        const page = await this.locRepository.search(locQuery);
        console.log("location.Search events[0] =", page);
        return page;
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get one Location' })
    @ApiParam({ name: 'id', type: String })
    async findOne(@Param() params): Promise<Location> {
        console.log("loc.findOne... id=", params.id);
        let loc = await Location.findOne(params.id);
        console.log("loc.findOne arc =", loc);
        return loc;
    }
}

