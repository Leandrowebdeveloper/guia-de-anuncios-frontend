import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderPage } from './header.page';

import { BreadcrumpsPageModule } from './breadcrumps/breadcrumps.module';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    BreadcrumpsPageModule
  ],
  declarations: [HeaderPage, MenuComponent],
  exports: [HeaderPage]
})
export class HeaderPageModule {}
