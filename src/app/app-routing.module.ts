import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './modules/auth/guards/no-auth.function.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [noAuthGuard()],
    canActivateChild: [noAuthGuard()],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule),
  },
  { path: 'tournaments', loadChildren: () => import('./modules/tournaments/tournaments.module').then(m => m.TournamentsModule) },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
