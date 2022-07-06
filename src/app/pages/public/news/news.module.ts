import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsPage } from './news.page';

import { NewsPageRoutingModule } from './news-routing.module';
import { HeaderComponentModule } from 'src/app/header/header.component.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NewsPageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
