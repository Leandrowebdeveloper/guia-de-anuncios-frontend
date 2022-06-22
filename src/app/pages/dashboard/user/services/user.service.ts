import { MessageService } from 'src/app/utilities/message/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Image, User } from 'src/app/interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ToastService } from 'src/app/utilities/toast/toast.service';

@Injectable({
    providedIn: 'root',
})
export class UserService extends HttpService<User> {
    private _user = new BehaviorSubject<User>(undefined);

    constructor(
        http: HttpClient,
        private toastService: ToastService,
        private messageService: MessageService,
        private storageService: StorageService
    ) {
        super(http, `${environment.api}api/users`);
    }

    public get avatar(): Image {
        return this.user.image;
    }

    public get userObservable(): Observable<User> {
        return this._user.asObservable();
    }
    public get user(): User {
        return this._user.value;
    }

    public get slug(): string {
        return this.user.slug;
    }

    public get name(): string {
        return `${this.user.firstName} ${this.user.lastName}`;
    }

    public set user(user: User) {
        this._user.next(user);
    }

    public set avatar(image: Image) {
        this.user.image = image;
        this._user.next(this.user);
    }

    public setToken() {
        this.token = this.storageService.getToken;
    }

    public setCsrf(csrf: string) {
        this.csrf = csrf;
    }

    public state(user: User): Observable<User | number[]> {
        return this.patch(user, 'state');
    }

    public async messageState(user: User): Promise<number> {
        return await this.messageService.success(user.message, 1000);
    }

    public error(error: HttpErrorResponse, subscribe: Subscription) {
        subscribe.unsubscribe();
        return this.messageService.error(error);
    }

    public updateName(user: User): Observable<User | number[]> {
        return this.patch(user, 'name');
    }
}
