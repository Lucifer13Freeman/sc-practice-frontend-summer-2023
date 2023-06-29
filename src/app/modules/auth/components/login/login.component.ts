import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICredentials } from '../../interfaces/credentials.interface';
import { Store } from '@ngrx/store';
import { AUTH_STATE_NAME, AuthState } from '../../store/auth.state';
import { AuthActions } from '../../store/auth.actions';
import { Observable, tap } from 'rxjs';
import { selectAuthState } from '../../store/auth.selectors';

type TControlName = keyof ICredentials;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public model$!: Observable<AuthState>;
  public form!: FormGroup;
  public isShownPassword: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<{ [AUTH_STATE_NAME]: AuthState }>
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.model$ = this.store.select(selectAuthState).pipe(
      tap((state: AuthState) => {
        if (state.data.isAuth && !!state.data.token && state.data.profile) {
          this.router.navigate(['']);
          return;
        }
        if (state.error?.error?.email) {
          this.form.get('email')?.setErrors({ serverError: state.error?.error?.email });
        }
        if (state.error?.error?.password) {
          this.form.get('password')?.setErrors({ serverError: state.error?.error?.password });
        }
      })
    );
  }

  public submit(): void {
    const credentials: ICredentials = {
      email: this.form.get('email')?.value?.trim(),
      password: this.form.get('password')?.value?.trim(),
    };
    this.store.dispatch(AuthActions.login({ data: { ...credentials } }));
  }

  public hasError(controlName: TControlName): boolean {
    return !!(
      this.form.get(controlName)?.invalid &&
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.dirty
    );
  }

  public getErrors(controlName: TControlName): string {
    return Object.values(this.form.get(controlName)?.errors ?? [])
      .filter((v) => typeof v === 'string' || v instanceof String)
      .join('; ');
  }
}
