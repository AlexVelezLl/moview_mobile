import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecificMoviePage } from './specific-movie.page';

const routes: Routes = [
  {
    path: '',
    component: SpecificMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecificMoviePageRoutingModule {}
