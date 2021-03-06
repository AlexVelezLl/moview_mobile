import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category, Movie } from 'src/app/models/interfaces.model';
import { ReviewObserverService } from 'src/app/observer/review-observer.service';
import { WatchlistObserverService } from 'src/app/observer/watchlist-observer.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  categories: Category[];
  producers: Array<{ name: string; movies: Movie[] }>;
  loading = true;
  selectedCategoryId = -1;
  private movies: Movie[];
  private removeFromWatchlistSubscription: Subscription;
  private reviewSubscription: Subscription;
  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService,
    private watchlistService: WatchlistService,
    private watchlistObserver: WatchlistObserverService,
    private reviewObserver: ReviewObserverService
  ) {}

  async ngOnInit() {
    await this.getData();
    this.loading = false;
    this.removeFromWatchlistSubscription = this.watchlistObserver
      .getRemoveObservable()
      .subscribe((idMovie) => {
        this.movies.forEach((movie) => {
          if (movie.id == idMovie) {
            movie.isInWatchlist = false;
          }
        });
      });
    this.reviewSubscription = this.reviewObserver
      .getObservable()
      .subscribe((review) => {
        const movie = this.movies.find((m) => m.id == review.id_movie);
        movie.avg_score =
          (movie.avg_score * movie.rating_numbers + review.score) /
          (movie.rating_numbers + 1);
        movie.rating_numbers++;
      });
  }

  private async getData() {
    this.movies = await this.movieService.getMovies();
    const watchlist = await this.watchlistService.getWatchlistOfUser();
    this.movies.forEach((movie) => {
      movie.isInWatchlist = watchlist.some((wl) => wl.id == movie.id);
    });
    this.filterProducers(this.movies);
    this.categories = await this.categoryService.getCategories();
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
    if (id == -1) {
      this.filterProducers(this.movies);
    } else {
      const movies = this.movies.filter((movie) =>
        movie.categories.includes(id)
      );
      this.filterProducers(movies);
    }
  }

  private filterProducers(movies: Movie[]) {
    this.producers = [];
    movies.forEach((movie) => {
      const moviesProducer = this.producers.find(
        (m) => m.name === movie.producer
      );
      if (moviesProducer) {
        moviesProducer.movies.push(movie);
      } else {
        this.producers.push({
          name: movie.producer,
          movies: [movie],
        });
      }
    });
    this.producers = this.producers.sort(
      (a, b) => b.movies.length - a.movies.length
    );
  }

  ngOnDestroy() {
    this.removeFromWatchlistSubscription?.unsubscribe();
    this.reviewSubscription?.unsubscribe();
  }
}
