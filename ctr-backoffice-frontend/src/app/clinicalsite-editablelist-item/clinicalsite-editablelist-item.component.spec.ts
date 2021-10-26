import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalSiteEditableListItemComponent } from './clinicalsite-editablelist-item.component';

describe('ClinicalSiteEditableListItemComponent', () => {
  let component: ClinicalSiteEditableListItemComponent;
  let fixture: ComponentFixture<ClinicalSiteEditableListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalSiteEditableListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalSiteEditableListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
