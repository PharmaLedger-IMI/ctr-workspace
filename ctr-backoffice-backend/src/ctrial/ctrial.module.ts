import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchService } from '../ctrms/match.service';
import { LFormsService } from '../lforms/lforms.service';

import { AppResourceController } from './appresource.controller';
import { AppUserController } from './appuser.controller';
import { AppUserService } from './appuser.service';
import { ClinicalSiteController } from './clinicalsite.controller';
import { ClinicalTrialController } from './clinicaltrial.controller';
import { ClinicalTrialRepository } from './clinicaltrial.repository';
import { ClinicalTrialService } from './clinicaltrial.service';
import { ClinicalTrialStatusController } from './clinicaltrialstatus.controller';
import { LocaleController } from './locale.controller';
import { LocationController } from './location.controller';
import { MatchRequestController } from './matchrequest.controller';
import { MatchRequestService } from './matchrequest.service';
import { MedicalConditionController } from './medicalcondition.controller';
import { QuestionDataTypeController } from './questiondatatype.controller';
import { QuestionTypeController } from './questiontype.controller';
import { SponsorController } from './sponsor.controller';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [
    AppResourceController,
    AppUserController,
    ClinicalSiteController,
    ClinicalTrialController,
    ClinicalTrialStatusController,
    LocaleController,
    LocationController,
    MatchRequestController,
    MedicalConditionController,
    QuestionDataTypeController,
    QuestionTypeController,
    SponsorController
  ],
  providers: [AppUserService, ClinicalTrialService, ClinicalTrialRepository, LFormsService, MatchRequestService, MatchService],
  exports: [AppUserService],
})
export class CTrialModule {}
