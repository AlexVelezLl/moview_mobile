import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
import { IonicModule } from '@ionic/angular';
import { CardReviewComponent } from './card-review/card-review.component';
import { ModalReviewComponent } from './modal-review/modal-review.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EskeletonMovieComponent } from './eskeleton-movie/eskeleton-movie.component';
import { EskeletonCategoryComponent } from './eskeleton-category/eskeleton-category.component';
import { EskeletonReviewComponent } from './eskeleton-review/eskeleton-review.component';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { EskeletonProfileComponent } from './eskeleton-profile/eskeleton-profile.component';
import { EskeletonWatchlistComponent } from './eskeleton-watchlist/eskeleton-watchlist.component';

@NgModule({
  declarations: [
    MovieComponent,
    CardReviewComponent,
    ModalReviewComponent,
    EskeletonMovieComponent,
    EskeletonCategoryComponent,
    EskeletonReviewComponent,
    EmptyListComponent,
    EskeletonProfileComponent,
    EskeletonWatchlistComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
  exports: [
    MovieComponent,
    CardReviewComponent,
    ModalReviewComponent,
    EskeletonMovieComponent,
    EskeletonCategoryComponent,
    EskeletonReviewComponent,
    EmptyListComponent,
    EskeletonProfileComponent,
    EskeletonWatchlistComponent,
  ],
})
export class ComponentsModule {}
