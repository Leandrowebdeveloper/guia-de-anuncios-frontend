import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivateAccountPageRoutingModule } from './redefine-password-routing.module';

import { RedefinePasswordPage } from './redefine-password.page';

import { FormComponentModule } from 'src/app/components/form/form.module';
import { RedefinePasswordResolver } from './guard/resolve.guard';
import { RedefinePasswordService } from './services/redefine-password.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivateAccountPageRoutingModule,
    FormComponentModule
  ],
  declarations: [RedefinePasswordPage],
  providers: [RedefinePasswordResolver, RedefinePasswordService]
})
export class RedefinePasswordPageModule {}
