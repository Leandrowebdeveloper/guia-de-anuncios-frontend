import { HeaderPageModule } from 'src/app/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RecoverPageRoutingModule } from './recover-routing.module';

import { FormComponentModule } from 'src/app/component/form/form.module';
import { RecoverPage } from './recover.page';
import { RecoverService } from './services/recover.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RecoverPageRoutingModule,
    HeaderPageModule,
    FormComponentModule
  ],
  declarations: [RecoverPage],
  providers: [RecoverService]
})
export class RecoverPageModule {}
