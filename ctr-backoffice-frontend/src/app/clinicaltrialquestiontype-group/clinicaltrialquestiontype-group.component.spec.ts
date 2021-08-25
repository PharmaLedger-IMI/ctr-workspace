import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalTrialQuestionTypeGroupComponent } from './clinicaltrialquestiontype-group.component';

describe('ClinicalTrialQuestionTypeGroupComponent', () => {
  let component: ClinicalTrialQuestionTypeGroupComponent;
  let fixture: ComponentFixture<ClinicalTrialQuestionTypeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalTrialQuestionTypeGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalTrialQuestionTypeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
