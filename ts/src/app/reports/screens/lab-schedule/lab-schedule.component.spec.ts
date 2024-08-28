import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabScheduleComponent } from './lab-schedule.component';

describe('LabScheduleComponent', () => {
  let component: LabScheduleComponent;
  let fixture: ComponentFixture<LabScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
