import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalTrialDetailComponent } from './clinicaltrial-detail.component';

describe('ClinicalTrialDetailComponent', () => {
  let component: ClinicalTrialDetailComponent;
  let fixture: ComponentFixture<ClinicalTrialDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalTrialDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalTrialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
