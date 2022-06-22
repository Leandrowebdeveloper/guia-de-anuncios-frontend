import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleryComponent } from './galery-component';
import { PhotoService } from './services/photo/photo.service';
import { HeaderModalModule } from '../header-modal/header-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModalModule
  ],
  declarations: [GaleryComponent],
  providers: [PhotoService]
})
export class GaleryComponentModule {}
