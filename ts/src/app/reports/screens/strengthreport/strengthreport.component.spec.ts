import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthreportComponent } from './strengthreport.component';

describe('StrengthreportComponent', () => {
  let component: StrengthreportComponent;
  let fixture: ComponentFixture<StrengthreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrengthreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrengthreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
