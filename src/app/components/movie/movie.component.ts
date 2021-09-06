import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/interfaces.model';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  duration: string;
  addingToWatchlist: boolean;
  constructor(private watchlistService: WatchlistService) {}

  ngOnInit() {
    if (this.movie.type === 'movie') {
      const hours = Math.floor(this.movie.duration / 60);
      const minutes = this.movie.duration % 60;
      this.duration = `${hours}h ${minutes}m`;
    } else {
      this.duration = `${this.movie.duration} eps`;
    }
  }

  async watchlistEventHandler(event) {
    event.stopPropagation();
    if (this.movie.isInWatchlist) {
      await this.removeFromWatchlist();
    } else {
      await this.addToWatchlist();
    }
  }

  async addToWatchlist() {
    this.addingToWatchlist = true;
    await this.watchlistService.addToWatchlist(
      this.movie.id,
      this.movie.image_cover
    );
    this.movie.isInWatchlist = true;
    this.addingToWatchlist = false;
  }

  async removeFromWatchlist() {
    this.addingToWatchlist = true;
    await this.watchlistService.removeFromWatchlist(this.movie.id);
    this.movie.isInWatchlist = false;
    this.addingToWatchlist = false;
  }
}
