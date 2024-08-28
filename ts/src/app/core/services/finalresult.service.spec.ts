import { TestBed } from '@angular/core/testing';

import { FinalresultService } from './finalresult.service';

describe('FinalresultService', () => {
  let service: FinalresultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalresultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
