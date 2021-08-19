import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialNewComponent } from './clinicaltrial-new.component';

describe('ClinicaltrialNewComponent', () => {
  let component: ClinicaltrialNewComponent;
  let fixture: ComponentFixture<ClinicaltrialNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicaltrialNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicaltrialNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
