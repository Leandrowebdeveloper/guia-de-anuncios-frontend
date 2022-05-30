import { HelpsService } from 'src/app/services/helps/helps.service';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/component/loading/loading.service';
import { AlertService } from 'src/app/component/alert/alert.service';
import { User } from 'src/app/interface';
import { ToastService } from 'src/app/component/toast/toast.service';

@Injectable()
export class RegisterService extends HttpService<User> {
  constructor(
    public http: HttpClient,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private navCtrl: NavController,
    private helpsService: HelpsService,
    private toastService: ToastService
  ) {
    super(http, `${environment.api}api/register`);
  }

  public store(user: User): Observable<User> {
    return this.create(user);
  }

  public async success(
    user: User,
    loading: Promise<HTMLIonLoadingElement>,
    subscribe: Subscription
  ) {
    await this.disableLoadingUnsubscribeRegisterVariable(loading, subscribe);
    await this.successMessage(user);
    return this.goToLoginPage();
  }

  private async successMessage(user: User): Promise<number> {
    return this.helpsService.delay(
      async () =>
        await this.toastService.show(user?.message, 'bottom', 'thumbs-up', 3000),
      3000
    );
  }

  private goToLoginPage(): number {
    return this.helpsService.delay(
      () => this.navCtrl.navigateForward('/entrar'),
      2500
    );
  }

  public async error(
    error: HttpErrorResponse,
    loading: Promise<HTMLIonLoadingElement>,
    subscribe: Subscription
  ) {
    await this.disableLoadingUnsubscribeRegisterVariable(loading, subscribe);
    return this.errorMessage(error?.error);
  }

  private errorMessage(error: HttpErrorResponse): any {
    return this.helpsService.delay(
      () => this.alertService.alert('Atenção', error?.error),
      2000
    );
  }

  public async loading(): Promise<HTMLIonLoadingElement> {
    return await this.loadingService.show('Criando conta...');
  }

  public async disableLoadingUnsubscribeRegisterVariable(
    loading: Promise<HTMLIonLoadingElement>,
    subscribe: Subscription
  ): Promise<void> {
    this.helpsService.delay(async () => (await loading).dismiss(), 2000);
    subscribe.unsubscribe();
  }
}
