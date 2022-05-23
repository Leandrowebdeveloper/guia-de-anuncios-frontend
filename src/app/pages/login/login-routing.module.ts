import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeactivateGuard } from 'src/app/component/form/guard/deactivate.guard';
import { LoginResolver } from './guard/resolve.guard';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canDeactivate: [DeactivateGuard],
    resolve: {
      login: LoginResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginResolver, DeactivateGuard]
})
export class LoginPageRoutingModule {}
