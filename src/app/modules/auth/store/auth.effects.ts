import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, tap, exhaustMap, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { IProfile } from '../interfaces/profile.interface';

@Injectable()
export class AuthEffects {
  public login$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ data }) =>
        this.authService.login(data).pipe(
          map(({ token }) => AuthActions.loginSuccess({ token })),
          catchError((error: unknown) => {
            console.error(error);
            return of(AuthActions.loginFailure({ error }));
          })
        )
      )
    );
  });

  public profile$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      switchMap(() =>
        this.authService.getProfile().pipe(
          map((profile: IProfile) => AuthActions.loadProfileSuccess({ profile })),
          catchError((error: unknown) => {
            console.error(error);
            return of(AuthActions.loadProfileFailure({ error }));
          })
        )
      )
    );
  });

  public register$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ data }) =>
        this.authService.register(data).pipe(
          map(() => AuthActions.registerSuccess()),
          catchError((error: unknown) => {
            console.error(error);
            return of(AuthActions.registerFailure({ error }));
          })
        )
      )
    );
  });

  public logout$: Observable<Action> = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
