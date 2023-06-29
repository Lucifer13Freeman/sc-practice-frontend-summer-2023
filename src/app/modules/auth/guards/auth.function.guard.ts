import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuth } from '../store/auth.selectors';
import { AUTH_STATE_NAME, AuthState } from '../store/auth.state';

export function authGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router: Router = inject(Router);
    return inject(Store<{ [AUTH_STATE_NAME]: AuthState }>)
      .select(selectIsAuth)
      .pipe(
        tap((isAuth: boolean) => {
          if (!isAuth) {
            router.navigateByUrl('auth');
          }
        })
      );
  };
}
