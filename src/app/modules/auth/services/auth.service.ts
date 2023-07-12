import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, of, take, switchMap, map, throwError } from 'rxjs';
import { IProfile } from '../interfaces/profile.interface';
import { AuthTokenService } from './auth-token.service';
import { ICredentials } from '../interfaces/credentials.interface';
import { IRegisterDataStudent } from '../interfaces/register-data.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { IToken } from '../interfaces/token.interface';

@Injectable()
export class AuthService {
  private mockProfile: IProfile = { id: '1', email: 'test@email.com', username: 'Test' };
  private mockToken: IToken = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTY5NTY0ODI5NH0.ObjtzQa4txa9KdMrelhvAgTufkXgxOjaUplv26u7tsM',
  };

  constructor() {}

  public simulateLoginError(credentials: ICredentials): void {
    const error: HttpErrorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
      error: {},
    });
    if (credentials.email === 'error@email.com') {
      error.error.email = 'Wrong email!';
    }
    if (credentials.password === 'error') {
      error.error.password = 'Wrong password!';
    }
    if (Object.values(error.error).length > 0) {
      throw error;
    }
  }

  public simulateProfileError(): void {
    if (!AuthTokenService.get()) {
      throw new HttpErrorResponse({
        status: 401,
        statusText: 'Not Authorized',
        error: {
          token: 'No token',
        },
      });
    }
  }

  public login(credentials: ICredentials): Observable<IToken> {
    console.log('Implement login method');
    return of(this.mockToken).pipe(
      tap((res: IToken) => {
        this.simulateLoginError(credentials);
        AuthTokenService.save(res.token);
      })
    );
  }

  public register(data: IRegisterDataStudent): Observable<IProfile> {
    console.log('Implement register method');
    return of(this.mockProfile);
  }

  // public init(): Observable<IAuthModel> {
  //   return this.getProfile().pipe(
  //     switchMap((profile: IProfile | null) => {
  //       this.modelSubject$.next({ ...this.initialState, profile, token });
  //       return this.modelSubject$.getValue();
  //     })
  //   );
  // }

  public getProfile(): Observable<IProfile> {
    console.log('Implement get profile method');
    return of(this.mockProfile).pipe(
      tap((res: IProfile) => {
        this.simulateProfileError();
      })
    );
  }

  public logout(): void {
    AuthTokenService.remove();
  }
}
