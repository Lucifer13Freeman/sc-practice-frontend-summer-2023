import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UsersEditComponent } from './users-edit.component';

@NgModule({
  declarations: [UsersEditComponent],
  exports: [UsersEditComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class UsersEditModule {}
