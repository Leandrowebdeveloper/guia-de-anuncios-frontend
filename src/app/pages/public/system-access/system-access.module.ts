import { HeaderPageModule } from 'src/app/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './system-access-routing.module';

import { SystemAccessPage } from './system-access.page';
import { FormComponentModule } from 'src/app/components/form/form.module';
import { SystemAccessPageButtonsModule } from 'src/app/components/buttons/system-access-page-buttons/system-access-page-buttons.module';
import { SystemAccessService } from './services/system-access.service';
import { RequisitionLimitComponentModule } from 'src/app/components/requisitionLimit/requisition-limit.module';
import { SystemAccessResolver } from './guard/resolve.guard';
import { RecoverService } from './services/recover/recover.service';
import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register/register.service';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginPageRoutingModule,
    HeaderPageModule,
    FormComponentModule,
    SystemAccessPageButtonsModule,
    RequisitionLimitComponentModule
  ],
  declarations: [SystemAccessPage],
  providers: [SystemAccessService, LoginService, RecoverService, RegisterService,  SystemAccessResolver]
})
export class LoginPageModule {}
