import { TestBed } from '@angular/core/testing';

import { DownloadpaperService } from './downloadpaper.service';

describe('DownloadpaperService', () => {
  let service: DownloadpaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadpaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
