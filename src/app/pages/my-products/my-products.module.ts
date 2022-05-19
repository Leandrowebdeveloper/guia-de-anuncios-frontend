import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyProductsPage } from './my-products.page';

import { MyProductsPageRoutingModule } from './my-products-routing.module';
import { HeaderPageModule } from 'src/app/header/header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MyProductsPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [MyProductsPage]
})
export class MyProductsPageModule {}
