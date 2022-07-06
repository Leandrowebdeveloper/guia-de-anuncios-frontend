import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvertPageRoutingModule } from './advert-routing.module';

import { AdvertPage } from './advert.page';
import { HeaderComponentModule } from 'src/app/header/header.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvertPageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [AdvertPage]
})
export class AdvertPageModule {}
