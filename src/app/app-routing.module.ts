import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './modules/auth/guards/no-auth.function.guard';
import { authGuard } from './modules/auth/guards/auth.function.guard';

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
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule),
    canActivate: [authGuard()],
    canActivateChild: [authGuard()],
  },
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
