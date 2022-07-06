import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BreadcrumpsComponentRoutingModule } from './breadcrumbs-routing.module';

import { BreadcrumpsComponent } from './breadcrumbs.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HttpClientModule,
        BreadcrumpsComponentRoutingModule,
    ],
    declarations: [BreadcrumpsComponent],
    exports: [BreadcrumpsComponent],
})
export class BreadcrumpsComponentModule {}
