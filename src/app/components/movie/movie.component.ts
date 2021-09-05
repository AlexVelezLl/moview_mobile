import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/interfaces.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  duration: string;
  constructor() {}

  ngOnInit() {
    if (this.movie.type === 'movie') {
      const hours = Math.floor(this.movie.duration / 60);
      const minutes = this.movie.duration % 60;
      this.duration = `${hours}h ${minutes}m`;
    } else {
      this.duration = `${this.movie.duration} eps`;
    }
  }
}
