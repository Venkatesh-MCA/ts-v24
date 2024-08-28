import { TestBed } from '@angular/core/testing';

import { TagmastersService } from './tagmasters.service';

describe('TagmastersService', () => {
  let service: TagmastersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagmastersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
