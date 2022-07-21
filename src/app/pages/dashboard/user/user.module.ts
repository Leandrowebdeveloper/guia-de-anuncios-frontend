import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPage } from './user.page';

import { UserPageRoutingModule } from './user-routing.module';

import { GaleryComponentModule } from 'src/app/components/galery/galery-component.module';
import { AvatarComponent } from './components/avatar/avatar.component';
import { StateComponent } from './components/status/state.component';
import { HeaderModalModule } from 'src/app/components/header-modal/header-modal.module';
import { FormComponentModule } from 'src/app/components/form/form.module';
import { FormNameComponent } from './components/name/form/form.component';
import { NameComponent } from './components/name/name.component';
import { PasswordComponent } from './components/password/password.component';
import { FormPasswordComponent } from './components/password/form/form.component';
import { FormEmailComponent } from './components/email/form/form.component';
import { EmailComponent } from './components/email/email.component';
import { HttpClientModule } from '@angular/common/http';
import { UserResolver } from './guard/resolve.guard';
import { DeleteComponent } from './components/delete/delete.component';
import { FormDeleteComponent } from './components/delete/form/form.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        UserPageRoutingModule,
        FormComponentModule,
        HeaderModalModule,
        GaleryComponentModule,
    ],
    declarations: [
        UserPage,
        AvatarComponent,
        StateComponent,
        NameComponent,
        FormNameComponent,
        PasswordComponent,
        FormPasswordComponent,
        EmailComponent,
        FormEmailComponent,
        DeleteComponent,
        FormDeleteComponent
    ],
    providers: [UserResolver],
})
export class UserPageModule {}
