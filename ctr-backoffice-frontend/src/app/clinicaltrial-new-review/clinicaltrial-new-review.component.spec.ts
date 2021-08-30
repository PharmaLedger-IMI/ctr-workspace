import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalTrialNewReviewComponent } from './clinicaltrial-new-review.component';

describe('ClinicalTrialNewReviewComponent', () => {
  let component: ClinicalTrialNewReviewComponent;
  let fixture: ComponentFixture<ClinicalTrialNewReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalTrialNewReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalTrialNewReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
