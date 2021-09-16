import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClinicalSiteComponent } from './dashboard-clinicalsite.component';

describe('DashboardClinicalSiteComponent', () => {
  let component: DashboardClinicalSiteComponent;
  let fixture: ComponentFixture<DashboardClinicalSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardClinicalSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardClinicalSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
