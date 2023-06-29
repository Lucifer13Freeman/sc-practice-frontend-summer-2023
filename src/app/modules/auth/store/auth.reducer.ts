import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import { AuthActions } from './auth.actions';
import { AuthTokenService } from '../services/auth-token.service';

export const initialState: AuthState = {
  status: 'INITIAL',
  data: {
    token: AuthTokenService.get(),
    isAuth: !!AuthTokenService.get(),
    profile: null,
  },
  error: null,
};

export const reducer = createReducer(
  initialState,
  /**
   * LOGIN
   */
  on(
    AuthActions.login,
    (state): AuthState => ({
      ...state,
      status: 'PENDING',
      data: {
        isAuth: false,
        profile: null,
        token: null,
      },
      error: initialState.error,
    })
  ),
  on(
    AuthActions.loginSuccess,
    (state, { token }): AuthState => ({
      ...state,
      status: 'SUCCESS',
      data: {
        isAuth: true,
        token: token,
        profile: null,
      },
      error: initialState.error,
    })
  ),
  on(AuthActions.loginFailure, (state, { error }): AuthState => {
    return {
      ...state,
      status: 'FAILURE',
      data: {
        ...initialState.data,
      },
      error,
    };
  }),
  on(AuthActions.logout, (state): AuthState => {
    return {
      ...initialState,
      data: {
        isAuth: false,
        profile: null,
        token: null,
      },
    };
  }),
  /**
   * LOAD PROFILE
   */
  on(
    AuthActions.loadProfile,
    (state): AuthState => ({
      ...state,
      status: 'PENDING',
      data: {
        ...state.data,
        profile: null,
      },
      error: initialState.error,
    })
  ),
  on(
    AuthActions.loadProfileSuccess,
    (state, { profile }): AuthState => ({
      ...state,
      status: 'SUCCESS',
      data: {
        ...state.data,
        profile,
      },
      error: initialState.error,
    })
  ),
  on(
    AuthActions.loadProfileFailure,
    (state, { error }): AuthState => ({
      ...state,
      status: 'FAILURE',
      data: {
        ...state.data,
        profile: initialState.data.profile,
      },
      error,
    })
  ),
  /**
   * REGISTER
   */
  on(
    AuthActions.register,
    (state): AuthState => ({
      ...state,
      status: 'PENDING',
      error: initialState.error,
    })
  ),
  on(
    AuthActions.registerSuccess,
    (state): AuthState => ({
      ...state,
      status: 'SUCCESS',
      error: initialState.error,
    })
  ),
  on(
    AuthActions.registerFailure,
    (state, { error }): AuthState => ({
      ...state,
      status: 'FAILURE',
      error,
    })
  )
);
