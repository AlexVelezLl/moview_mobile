import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardReviewComponent } from './card-review/card-review.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CardReviewComponent],
  imports: [CommonModule, IonicModule],
  exports: [CardReviewComponent],
})
export class ComponentsModule {}
