import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AUTH_STATE_NAME, AuthState } from '../../../auth/store/auth.state';
import { selectIsAuth, selectProfile } from '../../../auth/store/auth.selectors';
import { IProfile } from '../../../auth/interfaces/profile.interface';
import { combineLatest, map, Observable } from 'rxjs';
import { AuthActions } from '../../../auth/store/auth.actions';

interface IViewModel {
  profile: IProfile | null;
  isAuth: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public model$!: Observable<IViewModel>;

  constructor(private store: Store<{ [AUTH_STATE_NAME]: AuthState }>) {}

  public ngOnInit(): void {
    this.model$ = combineLatest([
      this.store.select(selectIsAuth),
      this.store.select(selectProfile),
    ]).pipe(
      map(([isAuth, profile]: [boolean, IProfile | null]): IViewModel => ({ isAuth, profile }))
    );
  }

  public logout($event: Event): void {
    $event.stopPropagation();
    this.store.dispatch(AuthActions.logout());
  }
}
