import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleupdateComponent } from './scheduleupdate.component';

describe('ScheduleupdateComponent', () => {
  let component: ScheduleupdateComponent;
  let fixture: ComponentFixture<ScheduleupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
