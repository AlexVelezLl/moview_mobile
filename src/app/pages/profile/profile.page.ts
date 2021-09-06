import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Review, User, Watchlist } from 'src/app/models/interfaces.model';
import { FollowingObserverService } from 'src/app/observer/following-observer.service';
import { ReviewObserverService } from 'src/app/observer/review-observer.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { UserService } from 'src/app/services/user/user.service';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  loading = true;
  user: User;
  watchlist: Watchlist[];
  reviews: Review[];
  myProfile: boolean;
  isFollowingUser: boolean;
  loadingFollowButton = false;
  idUser: any;
  reviewSubscription: Subscription;

  constructor(
    private userService: UserService,
    private whatchlistService: WatchlistService,
    private movieService: MovieService,
    private activatedRout: ActivatedRoute,
    private followingObserver: FollowingObserverService,
    private reviewObserver: ReviewObserverService
  ) {}

  async ngOnInit() {
    await this.getData();
    this.reviewSubscription = this.reviewObserver
      .getObservable()
      .subscribe(async () => {
        this.reviews = await this.movieService.getUserReviews(this.idUser);
      });
  }

  async getData() {
    this.loading = true;
    this.idUser = this.activatedRout.snapshot.paramMap.get('id');
    const myIdUser = await this.userService.getUserId();
    if (!this.idUser || +this.idUser === myIdUser) {
      this.myProfile = true;
      this.idUser = myIdUser;
    } else {
      this.idUser = +this.idUser;
      this.isFollowingUser = await this.userService.isFollowingUser(
        this.idUser
      );
    }
    this.user = await this.userService.getUserById(this.idUser);

    this.watchlist = await this.whatchlistService.getWatchlistOfUser();
    this.reviews = await this.movieService.getUserReviews(this.idUser);
    this.loading = false;
  }

  async follow() {
    this.loadingFollowButton = true;
    if (this.isFollowingUser) {
      await this.userService.unfollowUser(this.idUser);
    } else {
      await this.userService.followUser(this.idUser);
      this.followingObserver.publish();
    }
    this.isFollowingUser = !this.isFollowingUser;
    this.loadingFollowButton = false;
  }

  ngOnDestroy() {
    this.reviewSubscription.unsubscribe();
  }
}
