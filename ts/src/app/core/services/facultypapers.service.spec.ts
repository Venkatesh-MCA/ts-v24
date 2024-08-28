import { TestBed } from '@angular/core/testing';

import { FacultypapersService } from './facultypapers.service';

describe('FacultypapersService', () => {
  let service: FacultypapersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultypapersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
