import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultypaperviewComponent } from './facultypaperview.component';

describe('FacultypaperviewComponent', () => {
  let component: FacultypaperviewComponent;
  let fixture: ComponentFixture<FacultypaperviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultypaperviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultypaperviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
