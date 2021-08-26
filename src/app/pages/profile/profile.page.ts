import { Component, OnInit } from '@angular/core';
import { User, Watchlist } from 'src/app/models/interfaces.model';
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
  constructor(
    private userService: UserService,
    private whatchlistService: WatchlistService
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.user = await this.userService.getUserById(1);
    this.watchlist = await this.whatchlistService.getWatchlistOfUser(1);
    console.log(this.watchlist);

    this.loading = false;
  }
}
