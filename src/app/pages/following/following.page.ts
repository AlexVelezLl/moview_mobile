import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/models/interfaces.model';
import { FollowingObserverService } from 'src/app/observer/following-observer.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {
  reviews: Review[];
  loading = true;
  followingSubscription: Subscription;

  constructor(
    private movieService: MovieService,
    private followingObserver: FollowingObserverService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getReviews();
    this.followingSubscription = this.followingObserver
      .getObservable()
      .subscribe(() => {
        this.getReviews();
      });
  }

  async getReviews() {
    this.loading = true;
    const id = await this.userService.getUserId();
    this.reviews = await this.movieService.getUserFollowingReviews(id);
    this.loading = false;
  }

  ngOnDestroy() {
    this.followingSubscription?.unsubscribe();
  }
}
