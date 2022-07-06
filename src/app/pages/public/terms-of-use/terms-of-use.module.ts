import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsOfUsePageRoutingModule } from './terms-of-use-routing.module';

import { TermsOfUsePage } from './terms-of-use.page';
import { HeaderComponentModule } from 'src/app/header/header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsOfUsePageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [TermsOfUsePage]
})
export class TermsOfUsePageModule {}
