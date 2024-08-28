import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultypapersComponent } from './facultypapers.component';

describe('FacultypapersComponent', () => {
  let component: FacultypapersComponent;
  let fixture: ComponentFixture<FacultypapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultypapersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultypapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
