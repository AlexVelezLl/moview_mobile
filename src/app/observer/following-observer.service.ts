import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowingObserverService {
  private followingSubject = new Subject<any>();
  constructor() {}

  publish() {
    this.followingSubject.next();
  }

  getObservable() {
    return this.followingSubject;
  }
}
