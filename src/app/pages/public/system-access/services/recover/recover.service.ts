import { HttpService } from 'src/app/services/http/http.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User } from 'src/app/interface';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/component/loading/loading.service';
import { AlertService } from 'src/app/component/alert/alert.service';
import { NavController } from '@ionic/angular';
import { HelpsService } from 'src/app/services/helps/helps.service';
import { ToastService } from 'src/app/component/toast/toast.service';
import { Subscription } from 'rxjs';

@Injectable()
export class RecoverService extends HttpService<User> {
  constructor(
    public http: HttpClient,
    private navCtrl: NavController,
    private helpsService: HelpsService
  ) {
    super(http, `${environment.api}api/recover`);
  }

  public goToLoginPage(): number {
    return this.helpsService.delay(
      () => this.navCtrl.navigateForward('/entrar'),
      2500
    );
  }
}
