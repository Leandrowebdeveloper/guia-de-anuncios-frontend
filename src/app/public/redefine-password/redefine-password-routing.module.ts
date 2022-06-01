import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedefinePasswordPage } from './redefine-password.page';
import { RedefinePasswordResolver } from './guard/resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: RedefinePasswordPage,
    resolve: {
      redefinePassword: RedefinePasswordResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RedefinePasswordResolver]
})
export class ActivateAccountPageRoutingModule {}
