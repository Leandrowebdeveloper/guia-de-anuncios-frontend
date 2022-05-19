import { RecoverResolver } from './guard/resolve.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecoverPage } from './recover.page';

const routes: Routes = [
  {
    path: '',
    component: RecoverPage,
    resolve: {
      recover: RecoverResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RecoverResolver]
})
export class RecoverPageRoutingModule {}
