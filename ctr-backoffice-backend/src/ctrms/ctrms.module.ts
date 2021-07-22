import { Module } from '@nestjs/common';
import { ClinicalTrialRepository } from '../ctrial/clinicaltrial.repository';
import { ClinicalTrialService } from '../ctrial/clinicaltrial.service';
import { MatchRequestService } from '../ctrial/matchrequest.service';
import { LFormsService } from '../lforms/lforms.service';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  imports: [],
  controllers: [MatchController],
  providers: [ClinicalTrialRepository, ClinicalTrialService, LFormsService, MatchService, MatchRequestService],
})
export class CtrmsModule { }
