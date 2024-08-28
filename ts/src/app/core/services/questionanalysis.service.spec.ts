import { TestBed } from '@angular/core/testing';

import { QuestionanalysisService } from './questionanalysis.service';

describe('QuestionanalysisService', () => {
  let service: QuestionanalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionanalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
