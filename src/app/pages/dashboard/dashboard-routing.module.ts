import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth/guard/auth.guard';

import { DashboardPage } from './dashboard.page';
import { ChangeEmailResolver } from './user/pages/guard/change-email.guard';

const routes: Routes = [
    {
        path: '',
        component: DashboardPage,
    },
    {
        path: 'usuario/:id/alterar-email/:token',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./user/pages/change-email/change-email.module').then(
                (m) => m.ChangeEmailPageModule
            ),
            resolve: {
                changeEmail: ChangeEmailResolver
            }
    },
    {
        path: 'usuario/:id',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('../dashboard/user/user.module').then(
                (m) => m.UserPageModule
            ),
    },
    {
        path: 'anuncio/:id',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('../dashboard/advert/advert.module').then(
                (m) => m.AdvertPageModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ChangeEmailResolver]
})
export class DashboardPageRoutingModule {}
