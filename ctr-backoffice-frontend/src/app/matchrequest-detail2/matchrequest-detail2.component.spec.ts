import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRequestDetail2Component } from './matchrequest-detail2.component';

describe('MatchRequestDetail2Component', () => {
  let component: MatchRequestDetail2Component;
  let fixture: ComponentFixture<MatchRequestDetail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchRequestDetail2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchRequestDetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
