import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifiedPage } from './classified.page';

const routes: Routes = [
  {
    path: '',
    component: ClassifiedPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassifiedPageRoutingModule {}
