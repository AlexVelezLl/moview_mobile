import { TestBed } from '@angular/core/testing';

import { WatchlistObserverService } from './watchlist-observer.service';

describe('WatchlistObserverService', () => {
  let service: WatchlistObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchlistObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
