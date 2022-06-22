import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BreadcrumpsPageRoutingModule } from './breadcrumbs-routing.module';

import { BreadcrumpsPage } from './breadcrumbs.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BreadcrumpsPageRoutingModule,
    ],
    declarations: [BreadcrumpsPage],
    exports: [BreadcrumpsPage],
})
export class BreadcrumpsPageModule {}
