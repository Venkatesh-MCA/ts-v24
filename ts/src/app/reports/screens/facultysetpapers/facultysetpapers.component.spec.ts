import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultysetpapersComponent } from './facultysetpapers.component';

describe('FacultysetpapetsComponent', () => {
  let component: FacultysetpapersComponent;
  let fixture: ComponentFixture<FacultysetpapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultysetpapersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultysetpapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
