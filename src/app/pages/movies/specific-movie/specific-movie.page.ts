import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, Review } from 'src/app/models/interfaces.model';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-specific-movie',
  templateUrl: './specific-movie.page.html',
  styleUrls: ['./specific-movie.page.scss'],
})
export class SpecificMoviePage implements OnInit {
  movie: Movie;
  reviews: Review[];
  loading: boolean;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  async ngOnInit() {
    this.loading = true;
    let id = +this.route.snapshot.paramMap.get('id');
    this.movie = await this.movieService.getMovieById(id);
    this.reviews = await this.movieService.getMovieReviews(id);
    console.log(this.reviews);
    this.loading = false;
  }
}
