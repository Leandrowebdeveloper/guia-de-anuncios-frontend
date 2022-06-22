import { HelpsService } from 'src/app/services/helps/helps.service';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interface';

@Injectable()
export class RegisterService extends HttpService<User> {
    constructor(
        public http: HttpClient,
        private navCtrl: NavController,
        private helpsService: HelpsService
    ) {
        super(http, `${environment.api}api/register`);
    }

    public register(user: User): Observable<User> {
        return this.create(user);
    }

    public goToLoginPage(): number {
        return this.helpsService.delay(
            () => this.navCtrl.navigateForward('/entrar'),
            2500
        );
    }
}
