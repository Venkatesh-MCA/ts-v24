import { ComponentFixture, TestBed } from '@angular/core/testing';

import { operatorScreensComponent } from './screens.component';

describe('operatorScreensComponent', () => {
  let component: operatorScreensComponent;
  let fixture: ComponentFixture<operatorScreensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ operatorScreensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(operatorScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
