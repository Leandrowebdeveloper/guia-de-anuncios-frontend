import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';

import { BreadcrumpsComponentRoutingModule } from './breadcrumbs/breadcrumbs-routing.module';
import { BreadcrumpsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    BreadcrumpsComponentRoutingModule,
  ],
  declarations: [HeaderComponent, BreadcrumpsComponent],
  exports: [HeaderComponent],
})
export class HeaderComponentModule {}
