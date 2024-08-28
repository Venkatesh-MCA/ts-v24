import { TestBed } from '@angular/core/testing';

import { MarkdetailsService } from './markdetails.service';

describe('MarkdetailsService', () => {
  let service: MarkdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
