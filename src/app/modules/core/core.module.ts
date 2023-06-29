import { AbstractSingletonModule } from './singleton-module.abstract';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { AuthModule } from '../auth/auth.module';
import { NgRxModule } from './modules/ngrx/ngrx.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ModalModule } from './modules/modal/modal.module';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    NgRxModule,
    ModalModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    AuthModule.forRoot(),
  ],
  providers: [LocalStorageService],
})
export class CoreModule extends AbstractSingletonModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
