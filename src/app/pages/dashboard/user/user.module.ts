import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPage } from './user.page';

import { UserPageRoutingModule } from './user-routing.module';
import { HeaderPageModule } from 'src/app/header/header.module';
import { GaleryComponentModule } from 'src/app/components/galery/galery-component.module';
import { AvatarComponent } from './components/avatar/avatar.component';
import { StatusComponent } from './components/status/status.component';
import { HeaderModalModule } from 'src/app/components/header-modal/header-modal.module';
import { NameComponent } from './components/name/name.component';
import { FormComponentModule } from 'src/app/components/form/form.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UserPageRoutingModule,
    HeaderPageModule,
    HeaderModalModule,
    GaleryComponentModule,
    FormComponentModule
  ],
  declarations: [UserPage, AvatarComponent, StatusComponent, NameComponent]
})
export class UserPageModule {}
