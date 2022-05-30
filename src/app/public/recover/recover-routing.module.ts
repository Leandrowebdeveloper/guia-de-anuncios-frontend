import { RecoverResolver } from './guard/resolve.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecoverPage } from './recover.page';
import { DeactivateGuard } from 'src/app/component/form/guard/deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: RecoverPage,
    canDeactivate: [DeactivateGuard],
    resolve: {
      recover: RecoverResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RecoverResolver, DeactivateGuard]
})
export class RecoverPageRoutingModule {}
