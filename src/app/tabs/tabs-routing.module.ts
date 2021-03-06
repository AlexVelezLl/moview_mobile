import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../authGuard/auth-guard.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'movie',
        loadChildren: () =>
          import('../pages/movies/movies.module').then(
            (m) => m.MoviesPageModule
          ),
      },
      {
        path: 'following',
        loadChildren: () =>
          import('../pages/following/following.module').then(
            (m) => m.FollowingPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
    ],
    canActivate: [AuthGuardGuard],
  },
  {
    path: '',
    redirectTo: '/tabs/movie',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
