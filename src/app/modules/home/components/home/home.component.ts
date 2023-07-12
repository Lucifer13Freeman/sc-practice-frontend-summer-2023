import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AUTH_STATE_NAME, AuthState } from '../../../auth/store/auth.state';
import { selectIsAuth, selectProfile } from '../../../auth/store/auth.selectors';
import { IProfile } from '../../../auth/interfaces/profile.interface';
import { combineLatest, map, Observable } from 'rxjs';
import { AuthActions } from '../../../auth/store/auth.actions';
import { ITournament } from '../../interfaces/tournament.interface';
import { supportsScrollBehavior } from '@angular/cdk/platform';

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
  public isSlided = false;
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

  public onClick(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll() {
    if (window.scrollY >= 200) {
      this.isSlided = true;
    } else {
      this.isSlided = false;
    }
  }
}
