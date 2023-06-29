import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { AUTH_STATE_NAME } from './auth.state';
import { reducer } from './auth.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(AUTH_STATE_NAME, reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthStateModule {}
