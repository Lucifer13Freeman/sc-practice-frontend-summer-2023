import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuth } from '../store/auth.selectors';
import { Location } from '@angular/common';
import { AUTH_STATE_NAME, AuthState } from '../store/auth.state';

export function noAuthGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const location: Location = inject(Location);
    return inject(Store<{ [AUTH_STATE_NAME]: AuthState }>)
      .select(selectIsAuth)
      .pipe(
        tap((isAuth: boolean) => {
          if (isAuth && state.url === `/auth`) {
            location.back();
          }
        }),
        map((isAuth: boolean) => !isAuth)
      );
  };
}
