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
          import('../pages/home/home.module').then((m) => m.HomePageModule),
        data: { breadcrumb: 'Início' },
      },
      {
        path: 'noticias',
        loadChildren: () =>
          import('../pages/news/news.module').then((m) => m.NewsPageModule),
        data: { breadcrumb: 'Notícias' },
      },

      {
        path: 'meus-produtos',
        loadChildren: () =>
          import('../pages/my-products/my-products.module').then(
            (m) => m.MyProductsPageModule
          ),
        data: { breadcrumb: 'Meus Produtos' },
      },
      {
        path: 'login',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./../pages/login/login.module').then(
            (m) => m.LoginPageModule
          ),
        data: { breadcrumb: 'Login' },
      },
      {
        path: 'cadastrar',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./../pages/register/register.module').then(
            (m) => m.RegisterPageModule
          ),
        data: { breadcrumb: 'Cadastrar' },
      },
      {
        path: 'recuperar-senha',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./../pages/recover/recover.module').then(
            (m) => m.RecoverPageModule
          ),
        data: { breadcrumb: 'Recuperar Senha' },
      },
      {
        path: 'usuario',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/dashboard/user/user.module').then(
            (m) => m.UserPageModule
          ),
        data: { breadcrumb: 'Usuário' },
      },
      {
        path: 'administracao',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/dashboard/admin/admin.module').then(
            (m) => m.AdminPageModule
          ),
        data: { breadcrumb: 'Administração' },
      },
      {
        path: 'ativar-conta/:token',
        loadChildren: () =>
          import('../pages/activate-account/activate-account.module').then(
            (m) => m.ActivateAccountPageModule
          ),
        data: { breadcrumb: 'Ativar conta' },
      },

      {
        path: 'termos-de-uso',
        loadChildren: () =>
          import('../pages/terms-of-use/terms-of-use.module').then(
            (m) => m.TermsOfUsePageModule
          ),
        data: { breadcrumb: 'Termos de uso' },
      },
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full',
      },
      {
        path: '**',
        loadChildren: () =>
          import('./../pages/not-found/not-found.module').then(
            (m) => m.NotFoundPageModule
          ),
        data: { breadcrumb: 'Erro 404' },
      },
    ],
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/home',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class NavPageRoutingModule {}
