import { Component, OnInit } from '@angular/core';
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
  loading: boolean;
  user: User;
  watchlist: Watchlist[];
  reviews: Review[];
  constructor(
    private userService: UserService,
    private whatchlistService: WatchlistService,
    private movieService: MovieService
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.user = await this.userService.getUserById(1);
    this.watchlist = await this.whatchlistService.getWatchlistOfUser(1);
    this.reviews = await this.movieService.getUserReviews(1);
    console.log(this.watchlist);

    this.loading = false;
  }
}
