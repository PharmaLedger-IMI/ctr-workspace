import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeNewComponent } from './questiontype-new.component';

describe('QuestiontypeNewComponent', () => {
  let component: QuestionTypeNewComponent;
  let fixture: ComponentFixture<QuestionTypeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionTypeNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTypeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
