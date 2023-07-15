import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { AuthStateModule } from './store/auth-state.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthTokenService } from './services/auth-token.service';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthValidationService } from './validation/auth-validation.service';
import { RegisterSuccessModalComponent } from './modals/register-success/register-success-modal.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RegisterSuccessModalComponent],
  imports: [
    AuthRoutingModule,
    AuthStateModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AngularSvgIconModule,
    MatSelectModule,
  ],
  bootstrap: [LoginComponent],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthTokenService,
        AuthValidationService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    };
  }
}
