import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Review } from '../models/interfaces.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewObserverService {
  private reviewSubject = new Subject<Review>();
  constructor() {}

  publish(review: Review) {
    this.reviewSubject.next(review);
  }

  getObservable() {
    return this.reviewSubject;
  }
}
