import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppResourceController } from './appresource.controller';
import { AppUserController } from './appuser.controller';
import { AppUserService } from './appuser.service';
import { ClinicalSiteController } from './clinicalsite.controller';
import { ClinicalTrialController } from './clinicaltrial.controller';
import { ClinicalTrialStatusController } from './clinicaltrialstatus.controller';
import { LocaleController } from './locale.controller';
import { LocationController } from './location.controller';
import { MatchRequestController } from './matchrequest.controller';
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
  providers: [AppUserService],
  exports: [AppUserService],
})
export class CTrialModule {}
