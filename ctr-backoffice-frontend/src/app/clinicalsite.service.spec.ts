import { TestBed } from '@angular/core/testing';

import { ClinicalsiteService } from './clinicalsite.service';

describe('ClinicalsiteService', () => {
  let service: ClinicalsiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicalsiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
