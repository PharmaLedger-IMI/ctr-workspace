import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalSiteEditableListComponent } from './clinicalsite-editablelist.component';

describe('ClinicalSiteEditableListComponent', () => {
  let component: ClinicalSiteEditableListComponent;
  let fixture: ComponentFixture<ClinicalSiteEditableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalSiteEditableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalSiteEditableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
