import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { take, Observable, exhaustMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs/operators';
import { selectToken } from '../store/auth.selectors';
import { AuthState } from '../store/auth.state';
import { AuthTokenService } from '../services/auth-token.service';
import { AuthActions } from '../store/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthState>) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectToken).pipe(
      take(1),
      exhaustMap((token: string | null) => {
        if (token && AuthTokenService.isTokenExpired(token)) {
          this.store.dispatch(AuthActions.logout());
          return next.handle(request);
        }

        const req = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`),
        });
        return next.handle(req);
      }),
      catchError((errRes: HttpErrorResponse) => {
        if (errRes.status === 401) {
          this.store.dispatch(AuthActions.logout());
          this.store.dispatch(AuthActions.loginFailure({ error: errRes }));
        }
        throw errRes;
      })
    );
  }
}
