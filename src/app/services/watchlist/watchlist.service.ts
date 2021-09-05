import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Watchlist } from 'src/app/models/interfaces.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private url = environment.api + '/watchlist';
  constructor(private http: HttpClient) {}

  getWatchlistOfUser(): Promise<Watchlist[]> {
    const url_watchlist_user = this.url + '/user';
    return this.http.get<Watchlist[]>(url_watchlist_user).toPromise();
  }
}
