import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AUTH_STATE_NAME, AuthState } from '../../../auth/store/auth.state';
import { selectIsAuth, selectProfile } from '../../../auth/store/auth.selectors';
import { IProfile } from '../../../auth/interfaces/profile.interface';
import { AuthActions } from '../../../auth/store/auth.actions';
import { ITournament } from '../../interfaces/tournament.interface';

interface IViewModel {
  profile: IProfile | null;
  isAuth: boolean;
}
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent {
  public model$!: Observable<IViewModel>;
  public tournaments: ITournament[] = [
    {
      sportType: 'Шахматы',
      date: new Date('2023-03-20'),
      tourType: 'blahblah',
      players: {
        school: 'sdfdsff',
        city: 'yaroslavl',
      },
      playersQuantity: 4,
    },
  ];
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
