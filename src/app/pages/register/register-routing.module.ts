import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeactivateGuard } from 'src/app/component/form/guard/deactivate.guard';
import { RegisterResolver } from './guard/resolve.guard';
import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
    canDeactivate: [DeactivateGuard],
    resolve: {
      register: RegisterResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RegisterResolver, DeactivateGuard]
})
export class RegisterPageRoutingModule {}
