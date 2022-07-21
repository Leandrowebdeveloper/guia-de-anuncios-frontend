import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/guard/auth.guard';
import { NavPage } from './nav.page';

const routes: Routes = [
    {
        path: '',
        component: NavPage,
        children: [
            {
                path: 'inicio',
                loadChildren: () =>
                    import('../pages/public/home/home.module').then(
                        (m) => m.HomePageModule
                    ),
            },
            {
                path: 'erro',
                loadChildren: () =>
                    import('../pages/public/not-found/not-found.module').then(
                        (m) => m.NotFoundPageModule
                    ),
            },
            {
                path: 'noticias',
                loadChildren: () =>
                    import('../pages/public/news/news.module').then(
                        (m) => m.NewsPageModule
                    ),
            },

            {
                path: 'classificados',
                loadChildren: () =>
                    import('../pages/public/classified/classified.module').then(
                        (m) => m.ClassifiedPageModule
                    ),
            },

            {
                path: 'sair',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('../pages/public/logout/logout.module').then(
                        (m) => m.LogoutPageModule
                    ),
            },
            {
                path: 'cadastrar',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import(
                        '../pages/public/system-access/system-access.module'
                    ).then((m) => m.SystemAccessPageModule),
            },
            {
                path: 'entrar',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import(
                        '../pages/public/system-access/system-access.module'
                    ).then((m) => m.SystemAccessPageModule),
            },
            {
                path: 'entrar/admin',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import(
                        '../pages/public/system-access-admin/system-access-admin.module'
                    ).then((m) => m.SystemAccessAdminPageModule),
            },
            {
                path: 'recuperar-senha',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import(
                        '../pages/public/system-access/system-access.module'
                    ).then((m) => m.SystemAccessPageModule),
            },
            {
                path: 'redefinir-senha/:token',
                loadChildren: () =>
                    import(
                        '../pages/public/redefine-password/redefine-password.module'
                    ).then((m) => m.RedefinePasswordPageModule),
            },
            {
                path: 'painel-de-controle',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('../pages/dashboard/dashboard.module').then(
                        (m) => m.DashboardPageModule
                    ),
            },
            {
                path: 'painel-de-controle/admin',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('../pages/admin/dashboard-admin.module').then(
                        (m) => m.DashboardAdminPageModule
                    ),
            },
            {
                path: 'ativar-conta/:token',
                loadChildren: () =>
                    import(
                        '../pages/public/activate-account/activate-account.module'
                    ).then((m) => m.ActivateAccountPageModule),
            },
            {
                path: 'termos-de-uso',
                loadChildren: () =>
                    import(
                        '../pages/public/terms-of-use/terms-of-use.module'
                    ).then((m) => m.TermsOfUsePageModule),
            },
            {
                path: '',
                redirectTo: '/inicio',
                pathMatch: 'full',
            },
            {
                path: '**',
                loadChildren: () =>
                    import('../pages/public/not-found/not-found.module').then(
                        (m) => m.NotFoundPageModule
                    ),
                redirectTo: '/erro',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class NavPageRoutingModule {}
