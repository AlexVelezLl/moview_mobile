import { Component, OnInit } from '@angular/core';
import { Category, Movie } from 'src/app/models/interfaces.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { MovieService } from 'src/app/services/movie/movie.service';

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
  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService
  ) {}

  async ngOnInit() {
    await this.getData();
    this.loading = false;
  }

  private async getData() {
    this.movies = await this.movieService.getMovies();
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
  }
}
