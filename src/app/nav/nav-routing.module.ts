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
          import('../pages/public/home/home.module').then((m) => m.HomePageModule),
        data: { breadcrumb: 'Início' },
      },
      {
        path: 'noticias',
        loadChildren: () =>
          import('../pages/public/news/news.module').then((m) => m.NewsPageModule),
        data: { breadcrumb: 'Notícias' },
      },

      {
        path: 'classificados',
        loadChildren: () =>
          import('../pages/public/classified/classified.module').then(
            (m) => m.ClassifiedPageModule
          ),
        data: { breadcrumb: 'Classificados' },
      },

      {
        path: 'sair',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/public/logout/logout.module').then(
            (m) => m.LogoutPageModule
          ),
        data: { breadcrumb: 'Sair do sistema' },
      },
      {
        path: 'cadastrar',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/public/system-access/system-access.module').then(
            (m) => m.LoginPageModule
          ),
        data: { breadcrumb: 'Cadastrar' },
      },
      {
        path: 'entrar',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/public/system-access/system-access.module').then(
            (m) => m.LoginPageModule
          ),
        data: { breadcrumb: 'Entrar' },
      },
      {
        path: 'recuperar-senha',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/public/system-access/system-access.module').then(
            (m) => m.LoginPageModule
          ),
        data: { breadcrumb: 'Recuperar Senha' },
      },
      {
        path: 'redefinir-senha/:token',
        loadChildren: () =>
          import('../pages/public/redefine-password/redefine-password.module').then(
            (m) => m.RedefinePasswordPageModule
          ),
        data: { breadcrumb: 'Redefinir senha' },
      },
      {
        path: 'usuarios',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/restricted/user/user.module').then((m) => m.UserPageModule),
        data: { breadcrumb: 'Usuários' },
      },
      {
        path: 'anuncios',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../pages/restricted/advert/advert.module').then(
            (m) => m.AdvertPageModule
          ),
        data: { breadcrumb: 'Anúncios' },
      },
      {
        path: 'ativar-conta/:token',
        loadChildren: () =>
          import('../pages/public/activate-account/activate-account.module').then(
            (m) => m.ActivateAccountPageModule
          ),
        data: { breadcrumb: 'Ativar conta' },
      },
      {
        path: 'termos-de-uso',
        loadChildren: () =>
          import('../pages/public/terms-of-use/terms-of-use.module').then(
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
          import('../pages/public/not-found/not-found.module').then(
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
