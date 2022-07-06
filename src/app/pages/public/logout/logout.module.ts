import { LoginService } from './../system-access/services/login/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoutPageRoutingModule } from './logout-routing.module';

import { LogoutPage } from './logout.page';
import { HeaderComponentModule } from 'src/app/header/header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogoutPageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [LogoutPage],
  providers: [LoginService]
})
export class LogoutPageModule {}
