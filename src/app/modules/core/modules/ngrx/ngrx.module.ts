import { isDevMode, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {
  NavigationActionTiming,
  RouterState,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { ROUTER_STATE_NAME } from './router.selectors';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode(), name: 'NgRx STS Store' }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: ROUTER_STATE_NAME,
      routerState: RouterState.Minimal,
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
  ],
})
export class NgRxModule {}
