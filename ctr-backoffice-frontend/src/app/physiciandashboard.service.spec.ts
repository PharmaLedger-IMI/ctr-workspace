import { TestBed } from '@angular/core/testing';

import { PhysiciandashboardService } from './physiciandashboard.service';

describe('PhysiciandashboardService', () => {
  let service: PhysiciandashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysiciandashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
