import { IStoreState } from '../../common/store';
import { IProfile } from '../interfaces/profile.interface';

export const AUTH_STATE_NAME = 'auth';

export interface IAuthData {
  isAuth: boolean;
  token: string | null;
  profile: IProfile | null;
}

export type AuthState = IStoreState<IAuthData, any>;
