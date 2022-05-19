import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterResolver } from './guard/resolve.guard';
import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
    resolve: {
      register: RegisterResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RegisterResolver]
})
export class RegisterPageRoutingModule {}
