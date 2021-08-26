import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalReviewComponent } from 'src/app/components/modal-review/modal-review.component';
import { Movie, Review } from 'src/app/models/interfaces.model';
import { ReviewObserverService } from 'src/app/observer/review-observer.service';
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
    private movieService: MovieService,
    private modalController: ModalController,
    private reviewObserver: ReviewObserverService
  ) {}

  ngOnInit() {
    this.getData();
    this.reviewObserver.getObservable().subscribe(() => {
      this.getReviews();
    });
  }

  async getData() {
    this.loading = true;
    let id = +this.route.snapshot.paramMap.get('id');
    const [movie, reviews] = await Promise.all([
      this.movieService.getMovieById(id),
      this.movieService.getMovieReviews(id),
    ]);
    this.movie = movie;
    this.reviews = reviews;
    this.loading = false;
  }

  async getReviews() {
    this.reviews = await this.movieService.getMovieReviews(this.movie.id);
  }

  openMovie(link: string) {
    window.open(link);
  }

  async writeReview() {
    const modalReview = await this.modalController.create({
      component: ModalReviewComponent,
      cssClass: 'modal-review',
      componentProps: {
        movie: this.movie,
      },
    });
    return await modalReview.present();
  }
}
