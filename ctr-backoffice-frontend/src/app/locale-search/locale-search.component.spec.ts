import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleSearchComponent } from './locale-search.component';

describe('LocaleSearchComponent', () => {
  let component: LocaleSearchComponent;
  let fixture: ComponentFixture<LocaleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocaleSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
