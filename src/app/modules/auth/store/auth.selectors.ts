import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_STATE_NAME, AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const selectIsAuth = createSelector(selectAuthState, (state: AuthState) => {
  return !!state.data?.isAuth;
});

export const selectToken = createSelector(selectAuthState, (state: AuthState) => {
  return state.data?.token ?? null;
});

export const selectProfile = createSelector(selectAuthState, (state: AuthState) => {
  return state.data?.profile ?? null;
});
