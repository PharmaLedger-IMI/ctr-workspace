import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPhysicianComponent } from './dashboard-physician.component';

describe('DashboardPhysicianComponent', () => {
  let component: DashboardPhysicianComponent;
  let fixture: ComponentFixture<DashboardPhysicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPhysicianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPhysicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
