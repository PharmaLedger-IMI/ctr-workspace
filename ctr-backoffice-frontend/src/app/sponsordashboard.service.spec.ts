import { TestBed } from '@angular/core/testing';

import { SponsordashboardService } from './sponsordashboard.service';

describe('SponsordashboardService', () => {
  let service: SponsordashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SponsordashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
