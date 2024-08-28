import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrreportComponent } from './qrreport.component';

describe('QrreportComponent', () => {
  let component: QrreportComponent;
  let fixture: ComponentFixture<QrreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
