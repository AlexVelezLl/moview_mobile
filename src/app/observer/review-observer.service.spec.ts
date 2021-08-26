import { TestBed } from '@angular/core/testing';

import { ReviewObserverService } from './review-observer.service';

describe('ReviewObserverService', () => {
  let service: ReviewObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
