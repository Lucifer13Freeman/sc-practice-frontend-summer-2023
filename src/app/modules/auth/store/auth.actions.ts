import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICredentials } from '../interfaces/credentials.interface';
import { IProfile } from '../interfaces/profile.interface';
import { IRegisterData } from '../interfaces/register-data.interface';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ data: ICredentials }>(),
    'Login Success': props<{ token: string }>(),
    'Login Failure': props<{ error: unknown }>(),

    Register: props<{ data: IRegisterData }>(),
    'Register Success': emptyProps(),
    'Register Failure': props<{ error: unknown }>(),

    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ profile: IProfile }>(),
    'Load Profile Failure': props<{ error: unknown }>(),

    Logout: emptyProps(),
  },
});
