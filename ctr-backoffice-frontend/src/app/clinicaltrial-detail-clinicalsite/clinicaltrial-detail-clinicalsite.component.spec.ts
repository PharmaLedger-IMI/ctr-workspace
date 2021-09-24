import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalTrialDetailClinicalSiteComponent } from './clinicaltrial-detail-clinicalsite.component';

describe('ClinicalTrialDetailClinicalSiteComponent', () => {
  let component: ClinicalTrialDetailClinicalSiteComponent;
  let fixture: ComponentFixture<ClinicalTrialDetailClinicalSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalTrialDetailClinicalSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalTrialDetailClinicalSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
