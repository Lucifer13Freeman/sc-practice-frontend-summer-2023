import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor() {}

  private mockUser: IUser = {
    id: '1',
    email: 'Joe Doe',
  };

  public getAll(): IUser[] {
    return [this.mockUser];
  }
}
