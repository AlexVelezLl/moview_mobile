import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Watchlist } from 'src/app/models/interfaces.model';
import { WatchlistObserverService } from 'src/app/observer/watchlist-observer.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private url = environment.api + '/watchlist';
  private watchlist: Watchlist[];

  constructor(
    private http: HttpClient,
    private watchlistObserver: WatchlistObserverService
  ) {}

  async getWatchlistOfUser(forceReload = false): Promise<Watchlist[]> {
    if (forceReload || !this.watchlist) {
      const url_watchlist_user = this.url + '/user';
      this.watchlist = await this.http
        .get<Watchlist[]>(url_watchlist_user)
        .toPromise();
    }
    return this.watchlist;
  }

  addToWatchlist(id_movie: number, image: string) {
    const url = `${this.url}/${id_movie}`;
    this.watchlist.push({ id: id_movie, image_cover: image });
    this.watchlistObserver.publishAdd();
    return this.http.post(url, {}).toPromise();
  }

  removeFromWatchlist(id_movie: number) {
    const url = `${this.url}/${id_movie}`;
    const index = this.watchlist.findIndex((movie) => movie.id === id_movie);
    this.watchlist.splice(index, 1);
    this.watchlistObserver.publishRemove(id_movie);
    return this.http.delete<void>(url).toPromise();
  }

  dropWatchlist() {
    this.watchlist = undefined;
  }
}
