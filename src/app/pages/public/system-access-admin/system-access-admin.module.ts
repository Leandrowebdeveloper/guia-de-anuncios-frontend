import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './system-access-admin-routing.module';

import { SystemAccessAdminPage } from './system-access-admin.page';
import { FormComponentModule } from 'src/app/components/form/form.module';
import { LoginService } from './services/login-admin/login-admin.service';
import { SystemAccessService } from './services/system-access-admin.service';
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
        SystemAccessAdminPage,
    ],
    providers: [
        SystemAccessService,
        LoginService,
    ]
})
export class SystemAccessAdminPageModule {}
