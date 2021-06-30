import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialdetailComponent } from './trialdetail.component';

describe('TrialdetailComponent', () => {
  let component: TrialdetailComponent;
  let fixture: ComponentFixture<TrialdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrialdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
