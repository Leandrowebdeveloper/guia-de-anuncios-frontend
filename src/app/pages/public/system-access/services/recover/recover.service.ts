import { HttpService } from 'src/app/services/http/http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User } from 'src/app/interface';
import { NavController } from '@ionic/angular';
import { HelpsService } from 'src/app/services/helps/helps.service';

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
