import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review, User, Watchlist } from 'src/app/models/interfaces.model';
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

  constructor(
    private userService: UserService,
    private whatchlistService: WatchlistService,
    private movieService: MovieService,
    private activatedRout: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.getData();
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
    }
    this.isFollowingUser = !this.isFollowingUser;
    this.loadingFollowButton = false;
  }
}
