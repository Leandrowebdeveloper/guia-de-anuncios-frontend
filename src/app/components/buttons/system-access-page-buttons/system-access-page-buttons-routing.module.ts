import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemAccessPageButtons } from './system-access-page-buttons.page';

const routes: Routes = [
  {
    path: '',
    component: SystemAccessPageButtons
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemAccessPageButtonsRoutingModule {}
