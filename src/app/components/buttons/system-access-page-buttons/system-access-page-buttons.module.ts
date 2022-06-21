import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SystemAccessPageButtonsRoutingModule } from './system-access-page-buttons-routing.module';
import { SystemAccessPageButtons } from './system-access-page-buttons.page';
import { SystemAccessService } from 'src/app/pages/public/system-access/services/system-access.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SystemAccessPageButtonsRoutingModule
  ],
  declarations: [SystemAccessPageButtons],
  exports: [SystemAccessPageButtons],
  providers: [SystemAccessService]
})
export class SystemAccessPageButtonsModule {}
