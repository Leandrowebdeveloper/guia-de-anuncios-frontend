import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeEmailPageRoutingModule } from './change-email-routing.module';

import { ChangeEmailPage } from './change-email.page';
import { HeaderComponentModule } from 'src/app/header/header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeEmailPageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [ChangeEmailPage]
})
export class ChangeEmailPageModule {}
