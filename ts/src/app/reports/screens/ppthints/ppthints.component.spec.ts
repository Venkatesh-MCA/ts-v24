import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpthintsComponent } from './ppthints.component';

describe('PpthintsComponent', () => {
  let component: PpthintsComponent;
  let fixture: ComponentFixture<PpthintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpthintsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpthintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
