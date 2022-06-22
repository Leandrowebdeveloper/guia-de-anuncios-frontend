import { HttpService } from 'src/app/services/http/http.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { User } from 'src/app/interface';
import { AlertService } from 'src/app/utilities/alert/alert.service';
import { NavController } from '@ionic/angular';
import { HelpsService } from 'src/app/services/helps/helps.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/utilities/loading/loading.service';
import { MessageService } from 'src/app/utilities/message/message.service';

@Injectable()
export class RedefinePasswordService extends HttpService<User> {
    constructor(
        public http: HttpClient,
        private loadingService: LoadingService,
        private navCtrl: NavController,
        private helpsService: HelpsService,
        private messageService: MessageService
    ) {
        super(http, `${environment.api}api/redefine-password`);
    }

    public passwordRecover(user: User): Observable<User> {
        return this.create(user);
    }

    public async success(
        user: User,
        loading: Promise<HTMLIonLoadingElement>,
        subscribe: Subscription
    ) {
        await this.disableLoadingUnsubscribeRegisterVariable(
            loading,
            subscribe
        );
        await this.messageService.success(user.message);
        return this.goToLoginPage();
    }

    public error(
        error: HttpErrorResponse,
        loading: Promise<HTMLIonLoadingElement>,
        subscribe: Subscription
    ) {
        return this.messageService.error(error, loading, subscribe);
    }

    public async loading(): Promise<HTMLIonLoadingElement> {
        return await this.loadingService.show('Recuperando senha...');
    }

    public async disableLoadingUnsubscribeRegisterVariable(
        loading: Promise<HTMLIonLoadingElement>,
        subscribe: Subscription
    ): Promise<void> {
        this.helpsService.delay(async () => (await loading).dismiss(), 2000);
        subscribe.unsubscribe();
    }

    private goToLoginPage(): number {
        return this.helpsService.delay(
            () => this.navCtrl.navigateForward('/entrar'),
            2500
        );
    }

}
