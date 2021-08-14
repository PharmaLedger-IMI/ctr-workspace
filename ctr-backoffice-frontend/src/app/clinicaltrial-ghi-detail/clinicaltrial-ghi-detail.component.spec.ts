import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialGhiDetailComponent } from './clinicaltrial-ghi-detail.component';

describe('ClinicaltrialGhiDetailComponent', () => {
  let component: ClinicaltrialGhiDetailComponent;
  let fixture: ComponentFixture<ClinicaltrialGhiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicaltrialGhiDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialGhiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
