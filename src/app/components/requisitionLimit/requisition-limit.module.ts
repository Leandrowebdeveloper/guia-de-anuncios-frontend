import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequisitionLimitComponent } from './requisition-limit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [RequisitionLimitComponent],
  exports: [RequisitionLimitComponent]
})
export class RequisitionLimitComponentModule {}
