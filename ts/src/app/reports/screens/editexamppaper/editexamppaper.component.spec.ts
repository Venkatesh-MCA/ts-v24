import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditexamppaperComponent } from './editexamppaper.component';

describe('EditexamppaperComponent', () => {
  let component: EditexamppaperComponent;
  let fixture: ComponentFixture<EditexamppaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditexamppaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditexamppaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
