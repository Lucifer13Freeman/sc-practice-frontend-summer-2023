import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  constructor(private readonly usersService: UsersService) {}

  get users() {
    return this.usersService.getAll();
  }
}
