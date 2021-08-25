import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/models/interfaces.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  private url = environment.api + '/movie';

  getMovies(): Promise<Movie[]> {
    return this.http.get<Movie[]>(this.url).toPromise();
  }
}
