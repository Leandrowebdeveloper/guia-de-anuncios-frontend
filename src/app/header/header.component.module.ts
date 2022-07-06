import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';

import { BreadcrumpsComponentModule } from './breadcrumbs/breadcrumbs.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    BreadcrumpsComponentModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderComponentModule {}
