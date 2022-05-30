import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassifiedPage } from './classified.page';

import { ClassifiedPageRoutingModule } from './classified-routing.module';
import { HeaderPageModule } from 'src/app/header/header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ClassifiedPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [ClassifiedPage]
})
export class ClassifiedPageModule {}
