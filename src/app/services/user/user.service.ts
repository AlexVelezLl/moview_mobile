import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/interfaces.model';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';
import { WatchlistService } from '../watchlist/watchlist.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.api + '/user';
  private TOKEN_KEY = 'session_token';
  private ID_USER = 'id_user';

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
    private watchlistService: WatchlistService
  ) {}

  getUserById(id: number): Promise<User> {
    const url_user = this.url + '/' + id;
    return this.http.get<User>(url_user).toPromise();
  }

  getSessionToken() {
    return this.storage.get(this.TOKEN_KEY);
  }

  getUserId() {
    return this.storage.get(this.ID_USER);
  }

  async logout(force = false) {
    if (!force) {
      await this.http.post(environment.api + '/logout', {}).toPromise();
    }
    await this.storage.remove(this.TOKEN_KEY);
    this.watchlistService.dropWatchlist();
    this.router.navigate(['/'], { replaceUrl: true });
  }

  async isFollowingUser(id: number): Promise<boolean> {
    const url_user = this.url + '/following/' + id;
    const response = await this.http.get<any>(url_user).toPromise();
    return response.following;
  }

  followUser(id: number) {
    const url = this.url + '/follow/' + id;
    return this.http.post(url, {}).toPromise();
  }

  unfollowUser(id: number) {
    const url = this.url + '/unfollow/' + id;
    return this.http.post(url, {}).toPromise();
  }
}
