import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth/guard/auth.guard';
import { ChangeEmailResolver } from '../dashboard/user/pages/guard/change-email.guard';

import { DashboardPage } from './dashboard-admin.page';

const routes: Routes = [
    {
        path: '',
        component: DashboardPage,
    },
    {
        path: 'usuario/:id/alterar-email/:token',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import(
                '../dashboard/user/pages/change-email/change-email.module'
            ).then((m) => m.ChangeEmailPageModule),
        resolve: {
            changeEmail: ChangeEmailResolver,
        },
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
    {
        path: 'usuarios',
        loadChildren: () =>
            import('./users/users.module').then((m) => m.UsersPageModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ChangeEmailResolver],
})
export class DashboardAdminPageRoutingModule {}
