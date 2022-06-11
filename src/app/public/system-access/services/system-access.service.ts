import { HelpsService } from 'src/app/services/helps/helps.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from 'src/app/interface';
import { LoadingService } from 'src/app/component/loading/loading.service';
import { AlertService } from 'src/app/component/alert/alert.service';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/component/toast/toast.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from './login/login.service';
import { RecoverService } from './recover/recover.service';
import { AttrButton } from 'src/app/component/buttons/system-access-page-buttons/interface';
import { RegisterService } from './register/register.service';

@Injectable()
export class SystemAccessService {
  private _activeRoute: string = 'login' || 'recover' || 'register';
  public attrButton: AttrButton[] = [
    {
      route: 'login',
      icon: 'log-in',
      label: 'Entrar',
      fill: false,
      aria: 'Acessar o sistema.',
      title: 'Acessar o sistema.',
    },
    {
      route: 'recuperar-senha',
      icon: 'arrow-up-circle',
      label: 'Recuperar senha',
      fill: false,
      aria: 'Recuperar senha.',
      title: 'Recuperar senha.',
    },
    {
      route: 'cadastrar',
      icon: 'create',
      label: 'cadastrar',
      fill: false,
      aria: 'Criar conta.',
      title: 'Criar conta.',
    },
  ];
  constructor(
    public http: HttpClient,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private authService: AuthService,
    private toastService: ToastService,
    private helpsService: HelpsService,
    private loginService: LoginService,
    private recoverService: RecoverService,
    private registerService: RegisterService
  ) {}

  public get activeRoute(): string {
    return this._activeRoute;
  }
  public set activeRoute(value: string) {
    this._activeRoute = value;
  }

  public passwordRecover(user: User): Observable<User> {
    return this.recoverService.create(user);
  }

  public sendLoginData(user: User): Observable<User> {
    this.loginService.stayConnected = user.stayConnected;
    return this.loginService.create(user);
  }

  public register(user: User): Observable<User> {
    return this.registerService.register(user);
  }

  /********************************************************
   ******* MESSAGENS DE RETORNO DA CHAMADA HTTP ***********
   ********************************************************/
  public success(
    user: User,
    loading: Promise<HTMLIonLoadingElement>,
    subscribe: Subscription
  ): any {
    this.isLogin(user);
    return this.disableLoadingAndGoToUserPageAndShowMessage(
      user,
      loading,
      subscribe
    );
  }

  private isLogin(user: User): void {
    if (this.activeRoute === 'login') {
      return this.loginService.storesTokenDatabaseOrSession(user);
    }
  }

  private async disableLoadingUnsubscribeLoginVariable(
    loading: Promise<HTMLIonLoadingElement>,
    subscribe: Subscription
  ): Promise<void> {
    this.helpsService.delay(async () => (await loading).dismiss(), 2000);
    subscribe.unsubscribe();
  }

  public error(
    error: HttpErrorResponse,
    loading: Promise<HTMLIonLoadingElement>,
    subscribe: Subscription
  ) {
    this.disableLoadingUnsubscribeLoginVariable(loading, subscribe).then();
    if (error.status !== 403) {
      return this.errorMessage(error);
    }
  }

  private async disableLoadingAndGoToUserPageAndShowMessage(
    user: User,
    loading: Promise<HTMLIonLoadingElement>,
    subscribe: Subscription
  ) {
    await this.disableLoadingUnsubscribeLoginVariable(loading, subscribe);
    await this.goToUserPage();
    return await this.successMessage(user);
  }

  private async goToUserPage(): Promise<number> {
    switch (this.activeRoute) {
      case 'entrar':
        return this.authRoute();
      case 'recuperar-senha':
        return this.recoverService.goToLoginPage();
      case 'cadastrar':
        return this.registerService.goToLoginPage();
    }
  }

  private authRoute(): number | PromiseLike<number> {
    return this.helpsService.delay(
      async () => await this.authService.unauthenticatedUserAllowLoginRoute(),
      2500
    );
  }

  private async successMessage(user: User): Promise<number> {
    return this.helpsService.delay(
      async () =>
        await this.toastService.show(user.message, 'bottom', 'thumbs-up', 3000),
      3000
    );
  }

  private errorMessage(error: HttpErrorResponse): any {
    return this.helpsService.delay(
      () => this.alertService.alert('Atenção', error?.error),
      2000
    );
  }

  public async loading(message: string): Promise<HTMLIonLoadingElement> {
    return await this.loadingService.show(message);
  }
}
