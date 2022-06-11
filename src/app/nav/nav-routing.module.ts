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
          import('../public/home/home.module').then((m) => m.HomePageModule),
        data: { breadcrumb: 'Início' },
      },
      {
        path: 'noticias',
        loadChildren: () =>
          import('../public/news/news.module').then((m) => m.NewsPageModule),
        data: { breadcrumb: 'Notícias' },
      },

      {
        path: 'classificados',
        loadChildren: () =>
          import('../public/classified/classified.module').then(
            (m) => m.ClassifiedPageModule
          ),
        data: { breadcrumb: 'Classificados' },
      },

      {
        path: 'sair',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../public/logout/logout.module').then(
            (m) => m.LogoutPageModule
          ),
        data: { breadcrumb: 'Sair do sistema' },
      },
      {
        path: 'cadastrar',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../public/system-access/system-access.module').then(
            (m) => m.LoginPageModule
          ),
        data: { breadcrumb: 'Cadastrar' },
      },
      {
        path: 'entrar',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../public/system-access/system-access.module').then(
            (m) => m.LoginPageModule
          ),
        data: { breadcrumb: 'Entrar' },
      },
      {
        path: 'recuperar-senha',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../public/system-access/system-access.module').then(
            (m) => m.LoginPageModule
          ),
        data: { breadcrumb: 'Recuperar Senha' },
      },
      {
        path: 'redefinir-senha/:token',
        loadChildren: () =>
          import('../public/redefine-password/redefine-password.module').then(
            (m) => m.RedefinePasswordPageModule
          ),
        data: { breadcrumb: 'Redefinir senha' },
      },
      {
        path: 'usuarios',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../dashboard/user/user.module').then((m) => m.UserPageModule),
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
      {
        path: 'ativar-conta/:token',
        loadChildren: () =>
          import('../public/activate-account/activate-account.module').then(
            (m) => m.ActivateAccountPageModule
          ),
        data: { breadcrumb: 'Ativar conta' },
      },
      {
        path: 'termos-de-uso',
        loadChildren: () =>
          import('../public/terms-of-use/terms-of-use.module').then(
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
          import('../public/not-found/not-found.module').then(
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
