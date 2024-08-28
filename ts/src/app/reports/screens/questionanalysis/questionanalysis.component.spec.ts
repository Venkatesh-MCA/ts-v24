import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionanalysisComponent } from './questionanalysis.component';

describe('QuestionanalysisComponent', () => {
  let component: QuestionanalysisComponent;
  let fixture: ComponentFixture<QuestionanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionanalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
