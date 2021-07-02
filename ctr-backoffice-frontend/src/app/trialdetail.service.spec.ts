import { TestBed } from '@angular/core/testing';

import { TrialdetailService } from './trialdetail.service';

describe('TrialdetailService', () => {
  let service: TrialdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrialdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
