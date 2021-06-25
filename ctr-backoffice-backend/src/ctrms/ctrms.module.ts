import { Module } from '@nestjs/common';
import { ClinicalTrialRepository } from 'src/ctrial/clinicaltrial.repository';
import { ClinicalTrialService } from 'src/ctrial/clinicaltrial.service';
import { MatchRequestService } from 'src/ctrial/matchrequest.service';
import { LFormsService } from 'src/lforms/lforms.service';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  imports: [],
  controllers: [MatchController],
  providers: [ClinicalTrialRepository, ClinicalTrialService, LFormsService, MatchService, MatchRequestService],
})
export class CtrmsModule { }
