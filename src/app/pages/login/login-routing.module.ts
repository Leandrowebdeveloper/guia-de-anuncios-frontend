import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginResolver } from './guard/resolve.guard';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    resolve: {
      login: LoginResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginResolver]
})
export class LoginPageRoutingModule {}
