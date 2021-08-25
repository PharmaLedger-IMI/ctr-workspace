import { Connection, Like } from "typeorm";
import { Controller, Req, Delete, Get, Put, Param, Body, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam, ApiQuery, getSchemaPath, ApiExtraModels, ApiOkResponse } from "@nestjs/swagger";
import { ClinicalTrial } from './clinicaltrial.entity';
import { ClinicalTrialService } from './clinicaltrial.service';
import { ClinicalTrialQuery, ClinicalTrialQueryValidator } from "./clinicaltrialquery.validator";
import { ClinicalTrialRepository } from "./clinicaltrial.repository";
import { PaginatedDto } from "../paginated.dto";
import { QuestionType } from './questiontype.entity';
import { ClinicalTrialQuestionType } from "./clinicaltrialquestiontype.entity";


@ApiExtraModels(PaginatedDto)
@ApiTags('ClinicalTrial')
//@UseGuards(AuthGuard('jwt'))
//@ApiBearerAuth()
@Controller('/ctrial/clinicaltrial')
export class ClinicalTrialController {

    private ctrRepository: ClinicalTrialRepository;

    constructor(
        private connection: Connection,
        private ctrService: ClinicalTrialService
    ) {
        this.ctrRepository = this.connection.getCustomRepository(ClinicalTrialRepository);
    }

    @Get()
    @ApiOperation({summary: "Search for ClinicalTrials based on a query, with paginated results."})
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
    async search(@Query(ClinicalTrialQueryValidator) ctrQuery: ClinicalTrialQuery): Promise<PaginatedDto<ClinicalTrialQuery,ClinicalTrial>> {
        console.log("clinicaltrial.controller.search... query=", ctrQuery);
        const page = await this.ctrRepository.search(ctrQuery);
        console.log("clinicaltrial.Search events[0] =", page);
        return page;
    }

    @Get(":id/ghi")
    @ApiOperation({summary: "Get the definition of the questions for the General Health Information form."})
    @ApiParam({ name: 'id', type: String, description: "Must pass an existing trial id. Pass the nil UUID 00000000-0000-0000-0000-000000000000 to get the general health iformation base definition." })
    @ApiOkResponse({
        description: 'Array of QuestionType object',
        type: QuestionType,
        isArray: true
    })
    async getGhi(@Param('id') id: string): Promise<QuestionType[]> {
        console.log("ctr.getGhi... id=", id);
        const ghiQtArray = await this.ctrService.getLFormGeneralHealthInfoQuestionTypes(id);
        console.log("ctr.getGhi... result=", ghiQtArray);
        return ghiQtArray;
    }

    @Put(":id/ghi") // update GHI eligibility criteroa
    @ApiOperation({ summary: 'Create/Update the eligibility criteria for GHI of the specified trial' })
    @ApiOkResponse({ status: 200, description: 'The records have been successfully updated.'})
    async updateGhi(@Param('id') id: string, @Body() qtArray: QuestionType[]): Promise<QuestionType[]> {
        console.log("ctr.updateGhi... ctrId=", id, "qtArray=", qtArray);
        await this.ctrService.updateLFormGeneralHealthInfoQuestionTypes(id, qtArray);
        console.log("ctr.updateGhi DB connection closed");
        return qtArray;
    }

    @Get(":id/condition")
    @ApiOperation({summary: "Get the definition of the condition-specific question's form for the specified trial."})
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({
        description: 'Array of QuestionType object',
        type: QuestionType,
        isArray: true
    })
    async getCondition(@Param('id') id: string): Promise<QuestionType[]> {
        console.log("ctr.getCondition... id=", id);
        const conditionQtArray = await this.ctrService.getLFormConditionQuestionTypes(id);
        console.log("ctr.getCondition... result=", conditionQtArray);
        return conditionQtArray;
    }

    @Put(":id/condition") // update condition specific eligibility criteria
    @ApiOperation({ summary: 'Create/Update the eligibility criteria for condition-specific questions of the specified trial' })
    @ApiOkResponse({ status: 200, description: 'The records have been successfully updated.'})
    async updateCondition(@Param('id') id: string, @Body() qtArray: QuestionType[]): Promise<QuestionType[]> {
        console.log("ctr.updateCondition... ctrId=", id, "qtArray=", qtArray);
        await this.ctrService.updateLFormConditionQuestionTypes(id, qtArray);
        console.log("ctr.updateCondition DB connection closed");
        return qtArray;
    }

    @Get(":id/trial")
    @ApiOperation({summary: "Get the definition of the trial-specific question's form for the specified trial."})
    @ApiParam({ name: 'id', type: String })
    @ApiOkResponse({
        description: 'Array of ClinicalTrialQuestionType object',
        type: ClinicalTrialQuestionType,
        isArray: true
    })
    async getTrial(@Param('id') id: string): Promise<QuestionType[]> {
        console.log("ctr.getTrial... id=", id);
        const trialQtArray = await this.ctrService.getLFormTrialQuestionTypes(id);
        console.log("ctr.getTrial... result=", trialQtArray);
        return trialQtArray;
    }

    @Put(":id/trial") // update trial specific eligibility criteria
    @ApiOperation({ summary: 'Create/Update the eligibility criteria for trial-specific questions of the specified trial' })
    @ApiOkResponse({ status: 200, description: 'The records have been successfully updated.'})
    async updateTrial(@Param('id') id: string, @Body() qtArray: QuestionType[]): Promise<QuestionType[]> {
        console.log("ctr.updateTrial... ctrId=", id, "qtArray=", qtArray);
        await this.ctrService.updateLFormTrialQuestionTypes(id, qtArray);
        console.log("ctr.updateTrial DB connection closed");
        return qtArray;
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get one clinical trial' })
    @ApiParam({ name: 'id', type: String })
    async findOne(@Param() params): Promise<ClinicalTrial> {
        console.log("ctr.findOne... id=", params.id);
        let ctr = await ClinicalTrial.findOneOrFail(params.id, {
            relations: ["clinicalTrialMedicalConditions"]
        });
        console.log("ctr.findOne ctr =", ctr);
        return ctr;
    }

    @Post() // update all fields ???
    @ApiOperation({ summary: 'Create one ClinicalTrial' })
    async create(@Body() ctr: ClinicalTrial): Promise<ClinicalTrial> {
        console.log("ctr.post... ctr=", ctr);
        await this.ctrService.create(ctr);
        console.log("ctr.post DB connection closed, ctr =", ctr);
        return ctr;
    }

    @Put() // update all fields ???
    @ApiOperation({ summary: 'Update one ClinicalTrial' })
    async update(@Body() ctr: ClinicalTrial): Promise<ClinicalTrial> {
        console.log("ctr.put... ctr=", ctr);
        this.ctrService.update(ctr);
        console.log("ctr.put DB connection closed, ctr =", ctr);
        return ctr;
    }
}

