import { ComponentFixture, TestBed } from '@angular/core/testing';

import { managementScreensComponent } from './screens.component';

describe('ScreensComponent', () => {
  let component: managementScreensComponent;
  let fixture: ComponentFixture<managementScreensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ managementScreensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(managementScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
