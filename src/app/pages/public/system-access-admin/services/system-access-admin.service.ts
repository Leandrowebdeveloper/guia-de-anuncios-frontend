import { HelpsService } from 'src/app/services/helps/helps.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from 'src/app/interface';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from './login-admin/login-admin.service';
import { AttrButton } from 'src/app/pages/public/system-access/components/buttons/interface';

import { LoadingService } from 'src/app/utilities/loading/loading.service';
import { MessageService } from 'src/app/utilities/message/message.service';

@Injectable()
export class SystemAccessService {
    public readonly attrButton: AttrButton = {
        route: '/entrar',
        icon: 'log-in',
        label: 'Entrar',
        fill: false,
        aria: 'Acessar o sistema.',
        title: 'Acessar o sistema.',
    };

    constructor(
        public http: HttpClient,
        private loadingService: LoadingService,
        private messageService: MessageService,
        private authService: AuthService,
        private helpsService: HelpsService,
        private loginService: LoginService
    ) {}

    public sendLoginData(user: User): Observable<User> {
        this.loginService.stayConnected = user.stayConnected;
        return this.loginService.create(user);
    }

    public async loading(message: string): Promise<HTMLIonLoadingElement> {
        return await this.loadingService.show(message);
    }

    /********************************************************
     ******* MESSAGENS DE RETORNO DA CHAMADA HTTP ***********
     ********************************************************/
    public async success(
        user: User,
        loading: Promise<HTMLIonLoadingElement>,
        subscribe: Subscription
    ) {
        this.isLogin(user);
        await this.goToUserPage();
        await this.messageService.disable(loading, subscribe);
        this.messageService.success(user.message);
    }

    public error(
        error: HttpErrorResponse,
        loading: Promise<HTMLIonLoadingElement>,
        subscribe: Subscription
    ) {
        return this.messageService.error(error, loading, subscribe);
    }

    private isLogin(user: User): void {
        return this.loginService.storesTokenDatabaseOrSession(user);
    }

    private async goToUserPage(): Promise<number> {
        return this.authRoute();
    }

    private authRoute(): number | PromiseLike<number> {
        return this.helpsService.delay(
            async () =>
                await this.authService.unauthenticatedUserAllowLoginRoute(),
            2500
        );
    }
}
