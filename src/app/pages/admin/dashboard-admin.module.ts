import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardAdminPageRoutingModule } from './dashboard-admin-routing.module';

import { DashboardPage } from './dashboard-admin.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardAdminPageRoutingModule,

  ],
  declarations: [DashboardPage],
})
export class DashboardAdminPageModule {}
