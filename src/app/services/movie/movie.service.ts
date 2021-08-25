import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie, Review } from 'src/app/models/interfaces.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  private url = environment.api + '/movie';

  getMovies(): Promise<Movie[]> {
    return this.http.get<Movie[]>(this.url).toPromise();
  }

  getMovieById(id): Promise<Movie> {
    let url_movie = this.url + '/' + id;
    return this.http.get<Movie>(url_movie).toPromise();
  }

  getMovieReviews(id): Promise<Review[]> {
    let url_reviews = environment.api + '/review/movie/' + id;
    return this.http.get<Review[]>(url_reviews).toPromise();
  }
}
