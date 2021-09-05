import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
import { IonicModule } from '@ionic/angular';
import { CardReviewComponent } from './card-review/card-review.component';
import { ModalReviewComponent } from './modal-review/modal-review.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MovieComponent, CardReviewComponent, ModalReviewComponent],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
  exports: [MovieComponent, CardReviewComponent, ModalReviewComponent],
})
export class ComponentsModule {}
