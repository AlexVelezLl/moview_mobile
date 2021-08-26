import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
import { IonicModule } from '@ionic/angular';
import { CardReviewComponent } from './card-review/card-review.component';

@NgModule({
  declarations: [MovieComponent, CardReviewComponent],
  imports: [CommonModule, IonicModule],
  exports: [MovieComponent, CardReviewComponent],
})
export class ComponentsModule {}
