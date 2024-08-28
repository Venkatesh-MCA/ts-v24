import { TestBed } from '@angular/core/testing';

import { PptpaperService } from './pptpaper.service';

describe('PptpaperService', () => {
  let service: PptpaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PptpaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
