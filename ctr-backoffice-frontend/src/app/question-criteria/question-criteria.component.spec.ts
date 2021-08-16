import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCriteriaComponent } from './question-criteria.component';

describe('QuestionCriteriaComponent', () => {
  let component: QuestionCriteriaComponent;
  let fixture: ComponentFixture<QuestionCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
