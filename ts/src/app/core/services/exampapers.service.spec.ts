import { TestBed } from '@angular/core/testing';

import { ExampapersService } from './exampapers.service';

describe('ExampapersService', () => {
  let service: ExampapersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampapersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
