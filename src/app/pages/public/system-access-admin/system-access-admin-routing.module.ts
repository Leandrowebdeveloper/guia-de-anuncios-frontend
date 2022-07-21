import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeactivateGuard } from 'src/app/components/form/guard/deactivate.guard';
import { SystemAccessAdminResolver } from './guard/resolve.guard';


import { SystemAccessAdminPage } from './system-access-admin.page';

const routes: Routes = [
  {
    path: '',
    component: SystemAccessAdminPage,
    canDeactivate: [DeactivateGuard],
    resolve: {
      systemAccess: SystemAccessAdminResolver,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SystemAccessAdminResolver]
})
export class LoginPageRoutingModule {}
