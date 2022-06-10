import { HelpsService } from 'src/app/services/helps/helps.service';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User } from 'src/app/interface';
import { LoadingService } from 'src/app/component/loading/loading.service';
import { AlertService } from 'src/app/component/alert/alert.service';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/component/toast/toast.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()

/**
 * @class LoginService
 * @extends HttpService<User>
 */
export class LoginService extends HttpService<User> {
  private _stayConnected: boolean;
  constructor(
    public http: HttpClient,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private authService: AuthService,
    private toastService: ToastService,
    private helpsService: HelpsService
  ) {
    super(http, `${environment.api}api/login`);
  }

  private set stayConnected(value: boolean) {
    this._stayConnected = value;
  }

  private get stayConnected() {
    return this._stayConnected;
  }

  public sendLoginData(user: User): Observable<User> {
    this.stayConnected = user.stayConnected;
    return this.create(user);
  }

  private setTokenSession(user: User): void {
    return sessionStorage.setItem('token', user.token);
  }

  private async setTokenDatabase(user: User): Promise<void> {
    return await this.authService.setToken(user);
  }

  private setUser(user: User): User {
    return (this.authService.setUserAndAuthentication = user);
  }

  private setUserAndTokenInSession(user: User): void {
    this.setUser(user);
    this.setTokenSession(user);
  }

  private setUserAndTokenInDatabase(user: User): void {
    this.setUser(user);
    this.setTokenDatabase(user);
  }

  public success(
    user: User,
    loading: Promise<HTMLIonLoadingElement>,
    subscribe: Subscription
  ): any {
    this.storesTokenDatabaseOrSession(user);
    return this.disableLoadingAndGoToUserPageAndShowMessage(
      user,
      loading,
      subscribe
    );
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

  public async loading(): Promise<HTMLIonLoadingElement> {
    return await this.loadingService.show('Acessar o sistema...');
  }

  private storesTokenDatabaseOrSession(user: User): void {
    if (this.stayConnected) {
      return this.setUserAndTokenInDatabase(user);
    }
    return this.setUserAndTokenInSession(user);
  }
}
