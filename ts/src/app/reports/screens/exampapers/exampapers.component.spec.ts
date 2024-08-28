import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampapersComponent } from './exampapers.component';

describe('ExampapersComponent', () => {
  let component: ExampapersComponent;
  let fixture: ComponentFixture<ExampapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampapersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
