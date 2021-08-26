import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Review } from '../models/interfaces.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewObserverService {
  private reviewSubject = new Subject<any>();
  constructor() {}

  /**
   * Publish a new event that raises when the a given pet
   * have been changed
   * @param mascota The instance of the pet that have been changed
   */
  publish(review: Review) {
    this.reviewSubject.next(review);
  }

  /**
   * Returns the Pet subject in order to observe the
   * pets changes
   * @returns {Subject} The observable object
   */
  getObservable() {
    return this.reviewSubject;
  }
}
