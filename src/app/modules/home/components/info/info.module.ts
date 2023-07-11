import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import { InfoRoutingModule } from './info-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    InfoRoutingModule,
    AngularSvgIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
})
export class InfoModule {}
