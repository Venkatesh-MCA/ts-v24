import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionreportComponent } from './admissionreport.component';

describe('AdmissionreportComponent', () => {
  let component: AdmissionreportComponent;
  let fixture: ComponentFixture<AdmissionreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
