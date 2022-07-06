import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivateAccountPage } from './activate-account.page';
import { ActivateAccountResolver } from './guard/resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: ActivateAccountPage,
    resolve: {
      activateAccount: ActivateAccountResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivateAccountPageRoutingModule {}
