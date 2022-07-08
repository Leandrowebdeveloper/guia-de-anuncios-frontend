import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeactivateGuard } from 'src/app/components/form/guard/deactivate.guard';
import { SystemAccessResolver } from './guard/resolve.guard';

import { SystemAccessPage } from './system-access.page';

const routes: Routes = [
  {
    path: '',
    component: SystemAccessPage,
    canDeactivate: [DeactivateGuard],
    resolve: {
      systemAccess: SystemAccessResolver,
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SystemAccessResolver]
})
export class LoginPageRoutingModule {}
