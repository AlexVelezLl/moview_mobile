import { TestBed } from '@angular/core/testing';

import { FollowingObserverService } from './following-observer.service';

describe('FollowingObserverService', () => {
  let service: FollowingObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowingObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
