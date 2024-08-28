import { TestBed } from '@angular/core/testing';

import { ProgrammastersService } from './programmasters.service';

describe('ProgrammastersService', () => {
  let service: ProgrammastersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammastersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
