
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './system-access-routing.module';

import { SystemAccessPage } from './system-access.page';
import { FormComponentModule } from 'src/app/components/form/form.module';
import { RegisterService } from './services/register/register.service';
import { RecoverService } from './services/recover/recover.service';
import { LoginService } from './services/login/login.service';
import { SystemAccessService } from './services/system-access.service';
import { ButtonsAccessComponent } from './components/buttons/buttons-sccess-component';
import { RequisitionLimitComponentModule } from 'src/app/components/requisitionLimit/requisition-limit.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        LoginPageRoutingModule,
        FormComponentModule,
        RequisitionLimitComponentModule
    ],
    declarations: [
        SystemAccessPage,
        ButtonsAccessComponent,
    ],
    providers: [
        SystemAccessService,
        RegisterService,
        RecoverService,
        LoginService,
    ]
})
export class SystemAccessPageModule {}
