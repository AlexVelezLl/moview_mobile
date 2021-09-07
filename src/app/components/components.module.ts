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

@NgModule({
  declarations: [
    MovieComponent,
    CardReviewComponent,
    ModalReviewComponent,
    EskeletonMovieComponent,
    EskeletonCategoryComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
  exports: [
    MovieComponent,
    CardReviewComponent,
    ModalReviewComponent,
    EskeletonMovieComponent,
    EskeletonCategoryComponent,
  ],
})
export class ComponentsModule {}
