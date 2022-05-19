import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderPage } from './header.page';

import { BreadcrumpsPageModule } from './breadcrumps/breadcrumps.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreadcrumpsPageModule
  ],
  declarations: [HeaderPage],
  exports: [HeaderPage]
})
export class HeaderPageModule {}
