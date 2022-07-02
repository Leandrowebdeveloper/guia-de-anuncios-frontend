import { MessageService } from 'src/app/utilities/message/message.service';
import { HelpsService } from 'src/app/services/helps/helps.service';
import { NavController } from '@ionic/angular';
import { tap, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { User } from 'src/app/interface/index';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LoadingService } from 'src/app/utilities/loading/loading.service';

@Injectable()
export class LogoutService extends HttpService<User> {
    constructor(
        public http: HttpClient,
        private authService: AuthService,
        private storageService: StorageService,
        private navCtrl: NavController,
        private loadingService: LoadingService,
        private messageService: MessageService,
        private helpsService: HelpsService
    ) {
        super(http, `${environment.api}api/logout`);
        this.setAuthToken();
    }

    public destroySession(): Observable<User> {
        const loading = this.loading();
        return this.index().pipe(
            tap(
                (user: User) => this.success(user, loading),
                catchError((error: HttpErrorResponse) => {
                    this.error(error, loading);
                    return EMPTY;
                })
            )
        );
    }

    public success(user: User, loading: Promise<HTMLIonLoadingElement>) {
        this.setAuthUser(user);
        this.clearsSessionAndDatabaseStorage();
        this.disableLoadingAndGoToLoginPage(loading);
    }

    public async loading(): Promise<HTMLIonLoadingElement> {
        return await this.loadingService.show('Saindo do sistema...');
    }

    public async disableLoading(
        loading: Promise<HTMLIonLoadingElement>
    ): Promise<number> {
        return this.helpsService.delay(
            async () => await (await loading).dismiss(),
            2000
        );
    }

    public async error(
        error: HttpErrorResponse,
        loading: Promise<HTMLIonLoadingElement>
    ) {
        await this.disableLoading(loading);
        return this.messageService.error(error);
    }

    private setAuthToken(): void {
        this.token = this.isGetTokenSessionOrDatabase();
    }

    private isGetTokenSessionOrDatabase(): string {
        return sessionStorage.getItem('token') || this.storageService.getToken;
    }

    private async disableLoadingAndGoToLoginPage(
        loading: Promise<HTMLIonLoadingElement>
    ) {
        await this.disableLoading(loading);
        return await this.goToLoginPage();
    }

    private async goToLoginPage(): Promise<number> {
        return this.helpsService.delay(
            async () => await this.navCtrl.navigateForward('/entrar'),
            2500
        );
    }

    private clearsSessionAndDatabaseStorage(): void {
        this.removeTokenStorageSession();
        this.removeTokenStorageDatabase();
    }

    private removeTokenStorageSession(): void {
        return sessionStorage.removeItem('token');
    }

    private removeTokenStorageDatabase(): Promise<void> {
        return this.storageService.clean();
    }

    private setAuthUser(user: User): User {
        return (this.authService.setUserAndAuthentication = user);
    }

}
