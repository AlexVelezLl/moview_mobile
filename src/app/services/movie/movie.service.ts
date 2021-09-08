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

  async getMovies(): Promise<Movie[]> {
    const movies = await this.http.get<Movie[]>(this.url).toPromise();
    return movies.sort((a, b) => b.year - a.year);
  }

  getMovieById(id: number): Promise<Movie> {
    let url_movie = this.url + '/' + id;
    return this.http.get<Movie>(url_movie).toPromise();
  }

  async getMovieReviews(id: number): Promise<Review[]> {
    const url_reviews = environment.api + '/review/movie/' + id;
    const reviews = await this.http.get<Review[]>(url_reviews).toPromise();
    const reviewsSorted = reviews.sort(
      (a, b) => this.getTime(b.date) - this.getTime(a.date)
    );
    this.formatReviewDate(reviewsSorted);
    return reviewsSorted;
  }

  async getUserReviews(id: number): Promise<Review[]> {
    const url_reviews = environment.api + '/review/user/' + id;
    const reviews = await this.http.get<Review[]>(url_reviews).toPromise();
    const reviewsSorted = reviews.sort(
      (a, b) => this.getTime(b.date) - this.getTime(a.date)
    );
    this.formatReviewDate(reviewsSorted);
    return reviewsSorted;
  }

  async getUserFollowingReviews(id: number): Promise<Review[]> {
    const url_reviews = environment.api + '/review/following';
    const reviews = await this.http.get<Review[]>(url_reviews).toPromise();
    const reviewsSorted = reviews.sort(
      (a, b) => this.getTime(b.date) - this.getTime(a.date)
    );
    this.formatReviewDate(reviewsSorted);
    return reviewsSorted;
  }

  addReview(review: Review) {
    const url_review = environment.api + '/review';
    return this.http.post(url_review, review).toPromise();
  }

  private formatReviewDate(reviews: Review[]) {
    reviews.forEach((review) => {
      const date = review.date.split('/');
      const year = date[2].substring(2, 4);
      review.date = `${date[0]}/${date[1]}/${year}`;
    });
  }

  private getTime(date: string) {
    const dateSplit = date.split('/');
    const dateString = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
    return new Date(dateString).getTime();
  }
}
