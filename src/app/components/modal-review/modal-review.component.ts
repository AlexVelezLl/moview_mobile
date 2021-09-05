import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie, Review } from 'src/app/models/interfaces.model';
import { ReviewObserverService } from 'src/app/observer/review-observer.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-modal-review',
  templateUrl: './modal-review.component.html',
  styleUrls: ['./modal-review.component.scss'],
})
export class ModalReviewComponent implements OnInit {
  maxStars = [];
  score = 0;
  comment: string = '';
  sending = false;
  @Input() movie: Movie;
  constructor(
    private movieService: MovieService,
    private alertService: AlertService,
    private modalControler: ModalController,
    private reviewOserver: ReviewObserverService
  ) {}

  ngOnInit() {
    this.maxStars = Array(10)
      .fill(0)
      .map((_, i) => i + 1);
  }

  async sendReview() {
    this.sending = true;
    if (!this.validateReview()) {
      this.sending = false;
      return;
    }
    this.alertService.presentLoading('Enviando...');
    const review: Review = {
      id_movie: this.movie.id,
      score: this.score,
      comment: this.comment,
    };
    try {
      await this.movieService.addReview(review);
      this.reviewOserver.publish(review);
      this.alertService.presentToast('Reseña enviada exitosamente.');
      this.alertService.dismissLoading();
      this.modalControler.dismiss();
    } catch {
      this.alertService.presentToast(
        'Ya has escrito una reseña de esta película.'
      );
      this.alertService.dismissLoading();
    }
    this.sending = false;
  }

  private validateReview() {
    if (this.score === 0) {
      this.alertService.presentToast('Debes calificar la película.');
      return false;
    } else if (this.comment.length === 0) {
      this.alertService.presentToast('Debes escribir un comentario.');
      return false;
    }
    return true;
  }
  setScore(score: number) {
    this.score = score;
  }
}
