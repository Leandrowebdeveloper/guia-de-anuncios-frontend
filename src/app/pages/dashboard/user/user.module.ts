import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPage } from './user.page';

import { UserPageRoutingModule } from './user-routing.module';
import { HeaderPageModule } from 'src/app/header/header.module';
import { GaleryComponentModule } from 'src/app/components/galery/galery-component.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UserPageRoutingModule,
    HeaderPageModule,
    GaleryComponentModule
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
