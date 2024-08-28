import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PptpaperComponent } from './pptpaper.component';

describe('PptpaperComponent', () => {
  let component: PptpaperComponent;
  let fixture: ComponentFixture<PptpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PptpaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PptpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
