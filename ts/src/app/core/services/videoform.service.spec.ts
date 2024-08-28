import { TestBed } from '@angular/core/testing';

import { VideoformService } from './videoform.service';

describe('VideoformService', () => {
  let service: VideoformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
