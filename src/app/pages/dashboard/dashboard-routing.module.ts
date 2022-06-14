import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth/guard/auth.guard';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../dashboard/user/user.module').then(
        (m) => m.UserPageModule
      ),
    data: { breadcrumb: 'Usuários' },
  },
  {
    path: 'anuncios',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../dashboard/advert/advert.module').then(
        (m) => m.AdvertPageModule
      ),
    data: { breadcrumb: 'Anúncios' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
