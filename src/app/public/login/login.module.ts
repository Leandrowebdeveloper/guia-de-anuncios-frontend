import { HeaderPageModule } from 'src/app/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { FormComponentModule } from 'src/app/component/form/form.module';
import { SystemAccessPageButtonsModule } from 'src/app/component/buttons/system-access-page-buttons/system-access-page-buttons.module';
import { LoginService } from './services/login.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginPageRoutingModule,
    HeaderPageModule,
    FormComponentModule,
    SystemAccessPageButtonsModule
  ],
  declarations: [LoginPage],
  providers: [LoginService]
})
export class LoginPageModule {}
