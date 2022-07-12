import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassifiedPage } from './classified.page';

import { ClassifiedPageRoutingModule } from './classified-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ClassifiedPageRoutingModule,
  ],
  declarations: [ClassifiedPage]
})
export class ClassifiedPageModule {}
