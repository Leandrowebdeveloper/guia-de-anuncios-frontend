import { HeaderPageModule } from 'src/app/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { FormComponentModule } from 'src/app/component/form/form.module';
import { RegisterPage } from './register.page';
import { RegisterService } from './services/register.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RegisterPageRoutingModule,
    HeaderPageModule,
    FormComponentModule
  ],
  declarations: [RegisterPage],
  providers: [RegisterService]
})
export class RegisterPageModule {}
