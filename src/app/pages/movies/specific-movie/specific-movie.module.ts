import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecificMoviePageRoutingModule } from './specific-movie-routing.module';

import { SpecificMoviePage } from './specific-movie.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecificMoviePageRoutingModule,
    ComponentsModule,
    ComponentsModule
  ],
  declarations: [SpecificMoviePage],
})
export class SpecificMoviePageModule {}
