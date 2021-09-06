import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchlistObserverService {
  private addToWatchlistSubject = new Subject<any>();
  private removeFromWatchlistSubject = new Subject<any>();

  constructor() {}

  publishAdd() {
    this.addToWatchlistSubject.next();
  }

  getAddObservable() {
    return this.addToWatchlistSubject;
  }

  publishRemove(id_movie: number) {
    this.removeFromWatchlistSubject.next(id_movie);
  }

  getRemoveObservable() {
    return this.removeFromWatchlistSubject;
  }
}
