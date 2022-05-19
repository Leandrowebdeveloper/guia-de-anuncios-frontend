import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsPage } from './news.page';

import { NewsPageRoutingModule } from './news-routing.module';
import { HeaderPageModule } from 'src/app/header/header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NewsPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
