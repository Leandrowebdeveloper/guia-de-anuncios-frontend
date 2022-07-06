import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModalComponent } from './header-modal.component';


@NgModule({
  declarations: [HeaderModalComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [HeaderModalComponent],
})
export class HeaderModalModule { }
