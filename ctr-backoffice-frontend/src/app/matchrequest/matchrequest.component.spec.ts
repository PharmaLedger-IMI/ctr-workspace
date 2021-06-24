import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRequestComponent } from './matchrequest.component';

describe('MatchrequestComponent', () => {
  let component: MatchRequestComponent;
  let fixture: ComponentFixture<MatchRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
