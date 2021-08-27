import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/interfaces.model';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {
  reviews: Review[];
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getReviews();
  }

  async getReviews() {
    const id = 2;
    this.reviews = await this.movieService.getUserFollowingReviews(id);
    console.log(this.reviews);
  }
}
