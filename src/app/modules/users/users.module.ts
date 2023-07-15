import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UsersEditModule } from './components/users-edit/users-edit.module';
import { UsersComponent } from './components/users.component';
import { UsersRoutingModule } from './users-routing.module';
import { MatInputModule } from '@angular/material/input';
import { FilterUsersPipe } from './pipe/filter-users.pipe';
import { FilterTourneysPipe } from './pipe/filter-tourneys.pipe';
import { SortingUsersPipe } from './pipe/sorting.pipe';

@NgModule({
  declarations: [UsersComponent, FilterUsersPipe, FilterTourneysPipe, SortingUsersPipe],
  imports: [
    UsersRoutingModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    UsersEditModule,
    MatInputModule,
  ],
})
export class UsersModule {}
