import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { SpecificMoviePageModule } from '../movies/specific-movie/specific-movie.module';
import { SpecificMoviePage } from '../movies/specific-movie/specific-movie.page';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
  {
    matcher: (url: UrlSegment[]) => {
      const length = url.length;
      if (
        length >= 2 &&
        url[length - 2].path === 'user' &&
        url[length - 1].path.match(/^\d+$/)
      ) {
        return { consumed: url, posParams: { id: url[length - 1] } };
      }
    },
    component: ProfilePage,
  },
  {
    matcher: (url: UrlSegment[]) => {
      const length = url.length;
      if (
        length >= 3 &&
        url[length - 3].path === 'movie' &&
        url[length - 2].path === 'information' &&
        url[length - 1].path.match(/^\d+$/)
      ) {
        return { consumed: url, posParams: { id: url[length - 1] } };
      }
    },
    component: SpecificMoviePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ComponentsModule],
})
export class ProfilePageRoutingModule {}
