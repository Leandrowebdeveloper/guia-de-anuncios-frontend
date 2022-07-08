import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoutPageRoutingModule } from './logout-routing.module';

import { LogoutPage } from './logout.page';
import { HeaderComponentModule } from 'src/app/header/header.component.module';
import { LogoutService } from './service/logout.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogoutPageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [LogoutPage],
  providers: [LogoutService]
})
export class LogoutPageModule {}
