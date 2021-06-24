import { Module } from '@nestjs/common';
import { ClinicalTrialRepository } from 'src/ctrial/clinicaltrial.repository';
import { MatchRequestService } from 'src/ctrial/matchrequest.service';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  imports: [],
  controllers: [MatchController],
  providers: [MatchService, MatchRequestService, ClinicalTrialRepository],
})
export class CtrmsModule { }
