import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSponsorComponent } from './dashboard-sponsor.component';

describe('DashboardSponsorComponent', () => {
  let component: DashboardSponsorComponent;
  let fixture: ComponentFixture<DashboardSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSponsorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
