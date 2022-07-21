import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth/guard/auth.guard';
import { AdvertPage } from './advert.page';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdvertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertPageRoutingModule {}
