import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/component/loading/loading.service';
import { AlertService } from 'src/app/component/alert/alert.service';
import { User } from 'src/app/interface';

@Injectable()

/**
 * @file src/app/pages/register/services/register.service.ts
 * @class RegisterService
 * @extends HttpService<User>
 */
export class RegisterService extends HttpService<User> {
  constructor(
    public http: HttpClient,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {
    super(http, `${environment.api}api/register`);
  }

  /**
   * @class RegisterService
   * @function store
   * @readonly Envia dados do usuário para registro de acesso ao sistema
   * @param user User
   * @type Observable<User>
   * @returns Observable
   */
  public store(user: User): Observable<User> {
    return this.create(user);
  }

  /**
   * @class RegisterService
   * @function success
   * @readonly Finaliza a modal loading e dispara uma menssagem de alerta em caso de sucesso
   * @param user User
   * @param loading: Promise<HTMLIonLoadingElement>
   * @param subscribe: Subscription
   * @type NodeJS.Timeout
   * @returns void
   */
  public success(
    user: User,
    loading: Promise<HTMLIonLoadingElement>,
    subscribe: Subscription
  ) {
    this.finish(loading, subscribe).then();
    return this.timeout(this.alertService.alert('Parabéns', user?.message));
  }

  /**
   * @class RegisterService
   * @function error
   * @readonly Finaliza a modal loading e dispara uma menssagem de alerta em caso de erro
   * @param error HttpErrorResponse
   * @param loading: Promise<HTMLIonLoadingElement>
   * @param subscribe: Subscription
   * @type NodeJS.Timeout
   * @returns void
   */
  public error(
    error: HttpErrorResponse,
    loading: Promise<HTMLIonLoadingElement>,
    subscribe: Subscription
  ) {
    this.finish(loading, subscribe).then();
    return this.timeout(this.alertService.alert('Atenção', error?.error));
  }

  /**
   * @class RegisterService
   * @function loading
   * @readonly Instância um modal com spinner durante o curso da chamada http
   * @type NodeJS.Timeout
   * @returns void
   */
  public async loading(): Promise<HTMLIonLoadingElement> {
    return await this.loadingService.show('Criando conta...');
  }

  /**
   * @class RegisterService
   * @function startLoading
   * @readonly Inicia um modal com spinner durante o curso da chamada http
   * @type Promise<HTMLIonLoadingElement>
   * @returns void
   */
  public async startLoading(): Promise<HTMLIonLoadingElement> {
    const loading = this.loading();
    (await loading).present();
    return loading;
  }

  /**
   * @class RegisterService
   * @function finish
   * @readonly Finaliza um modal com spinner após a chamada http
   * @type Promise<HTMLIonLoadingElement>
   * @param loading: Promise<HTMLIonLoadingElement>,
   * @param subscribe: Subscription
   * @returns void
   */
  public async finish(
    loading: Promise<HTMLIonLoadingElement>,
    subscribe: Subscription
  ): Promise<void> {
    (await loading).dismiss();
    subscribe.unsubscribe();
  }

  /**
   * @class RegisterService
   * @function timeout
   * @readonly Temporizador para a execução dos alerta de menssagens
   * @type NodeJS.Timeout
   * @param callback Promise<any>
   * @returns void
   */
  private timeout(callback: Promise<any>) {
    return setTimeout(() => callback, 2000);
  }
}
