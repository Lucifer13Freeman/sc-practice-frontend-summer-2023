import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users.component';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule],
  providers: [UsersService],
  exports: [UsersComponent],
})
export class UsersModule {}
