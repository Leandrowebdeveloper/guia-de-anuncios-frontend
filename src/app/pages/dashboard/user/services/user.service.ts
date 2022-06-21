import { ToastService } from 'src/app/components/toast/toast.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Image, User } from 'src/app/interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HelpsService } from 'src/app/services/helps/helps.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class UserService extends HttpService<User> {
    private _user = new BehaviorSubject<User>(undefined);
    constructor(
        http: HttpClient,
        private toastService: ToastService,
        private helpsService: HelpsService,
        private alertService: AlertService,
        private storageService: StorageService
    ) {
        super(http, `${environment.api}api/users`);
    }

    public setToken() {
        this.token = this.storageService.getToken;
    }

    public setCsrf(csrf: string) {
        this.csrf = csrf;
    }

    public set user(user: User) {
        this._user.next(user);
    }

    public get user() {
        return this._user.value;
    }

    public get avatar() {
        return this._user.value.image;
    }

    public set avatar(image: Image) {
        this.user.image = image;
        this._user.next(this.user);
    }

    public get slug(): string {
        return this._user.value.slug;
    }

    public get name(): string {
        return `${this._user.value.firstName} ${this._user.value.lastName}`;
    }

    public get userObservable(): Observable<User> {
        return this._user.asObservable();
    }

    public state(user: User): Observable<User | number[]> {
        return this.patch(user, 'state');
    }

    public async messageState(user: User): Promise<HTMLIonToastElement> {
        return await this.toastService.show(
            user.message,
            'bottom',
            'thumbs-up',
            1000
        );
    }

    public error(error: HttpErrorResponse, subscribe: Subscription) {
        subscribe.unsubscribe();
        return this.errorMessage(error);
    }

    private errorMessage(error: HttpErrorResponse): any {
        return this.helpsService.delay(
            () => this.alertService.alert('Atenção', error?.error),
            2000
        );
    }
}
