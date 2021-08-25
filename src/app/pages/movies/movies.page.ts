import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  constructor(private movieService: MovieService) {}

  async ngOnInit() {
    const movies = await this.movieService.getMovies();
    console.log(movies[0].image_cover);
  }
}
