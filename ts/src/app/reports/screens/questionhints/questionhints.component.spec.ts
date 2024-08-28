import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionhintsComponent } from './questionhints.component';

describe('QuestionhintsComponent', () => {
  let component: QuestionhintsComponent;
  let fixture: ComponentFixture<QuestionhintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionhintsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionhintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
