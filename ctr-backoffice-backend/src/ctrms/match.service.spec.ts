import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalTrialService } from '../ctrial/clinicaltrial.service';
import { MatchRequestService } from '../ctrial/matchrequest.service';
import { LFormsService } from '../lforms/lforms.service';
import { ClinicalTrialRepository } from '../ctrial/clinicaltrial.repository';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { CTrialModule } from '../ctrial/ctrial.module';

describe('MatchService', () => {
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CTrialModule],
      controllers: [MatchController],
      providers: [ClinicalTrialRepository, ClinicalTrialService, LFormsService, MatchService, MatchRequestService],
    }).compile();

    service = module.get<MatchService>(MatchService);
  });

  it('tbd', () => {
    expect(service).toBeDefined();
  });
});
