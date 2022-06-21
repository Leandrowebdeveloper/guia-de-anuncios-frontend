import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivateAccountPageRoutingModule } from './redefine-password-routing.module';

import { RedefinePasswordPage } from './redefine-password.page';
import { RedefinePasswordService } from './services/redefine-password.service';
import { HeaderPageModule } from 'src/app/header/header.module';
import { FormComponentModule } from 'src/app/components/form/form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivateAccountPageRoutingModule,
    HeaderPageModule,
    FormComponentModule
  ],
  declarations: [RedefinePasswordPage],
  providers: [RedefinePasswordService]
})
export class RedefinePasswordPageModule {}
