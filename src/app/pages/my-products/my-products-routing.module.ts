import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProductsPage } from './my-products.page';

const routes: Routes = [
  {
    path: '',
    component: MyProductsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProductsPageRoutingModule {}
