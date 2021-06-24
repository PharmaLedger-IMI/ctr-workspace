import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRequestDetailComponent } from './matchrequest-detail.component';

describe('MatchRequestDetailComponent', () => {
  let component: MatchRequestDetailComponent;
  let fixture: ComponentFixture<MatchRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchRequestDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
