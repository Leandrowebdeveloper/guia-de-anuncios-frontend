import { MessageService } from 'src/app/utilities/message/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';
import { BehaviorSubject, EMPTY, Subscription } from 'rxjs';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Image, User } from 'src/app/interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/services/storage/storage.service';
import { catchError, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { BreadcrumbsService } from 'src/app/header/breadcrumbs/service/breadcrumbs.service';

@Injectable({
    providedIn: 'root',
})
export class UserService extends HttpService<User> {
    private $authUser = new BehaviorSubject<User>(undefined);

    constructor(
        http: HttpClient,
        private messageService: MessageService,
        private storageService: StorageService,
        private location: Location,
        private breadcrumbsService: BreadcrumbsService
    ) {
        super(http, `${environment.api}api/users`);
    }

    public getUserAvatar(): Image {
        return this.$authUser.value.image;
    }

    public authUserObservable(): Observable<User> {
        return this.$authUser.asObservable();
    }
    public getAuthUser(): User {
        return this.$authUser.value;
    }

    public getAuthUserSlug(): string {
        return this.$authUser.value.slug;
    }

    public getAuthState(): boolean {
        return this.$authUser.value.authState;
    }

    public setAuthSlug(user: User) {
        this.$authUser.value.slug = user.slug;
        this.setAuthUser(this.$authUser.value);
    }

    public getAuthUserLastName() {
        return this.$authUser.value.lastName;
    }

    public setAuthUserLastName(user: User) {
        this.$authUser.value.lastName = user.lastName;
        this.setAuthUser(this.$authUser.value);
    }

    public getAuthUserFirstName() {
        return this.$authUser.value.firstName;
    }

    public setAuthUserFirstName(user: User) {
        this.$authUser.value.firstName = user.firstName;
        this.setAuthUser(this.$authUser.value);
    }

    public getAuthUserEmail() {
        return this.$authUser.value.email;
    }

    public setAuthUserEmail(user: User) {
        this.$authUser.value.email = user.email;
        this.setAuthUser(this.$authUser.value);
    }

    public setAuthUserState(user: User) {
        this.$authUser.value.authState = user.authState;
        this.setAuthUser(this.$authUser.value);
    }

    public getAuthUserName(): string {
        return `${this.$authUser.value.firstName} ${this.$authUser.value.lastName}`;
    }

    public setAuthUser(user: User) {
        this.$authUser.next(user);
    }

    public setAuthAvatar(image: Image) {
        this.$authUser.value.image = image;
        this.setAuthUser(this.$authUser.value);
    }

    public setAuthToken() {
        this.token = this.storageService.getToken;
    }

    public setAuthCsrf(csrf: string) {
        this.csrf = csrf;
    }

    public async message(user: User): Promise<number> {
        return await this.messageService.success(user.message, 1000);
    }

    public error(error: HttpErrorResponse, subscribe: Subscription) {
        subscribe.unsubscribe();
        return this.messageService.error(error);
    }

    public updateAuthName(user: User): Observable<User | number[]> {
        return this.patch(user, 'name').pipe(
            tap((user_: User) => {
                this.setAuthUserFirstName(user_);
                this.setAuthUserLastName(user_);
                this.setAuthSlug(user_);
                this.updateAuthUserUrl();
            }),
            catchError((error) => EMPTY)
        );
    }

    public updateAuthEmail(user: User): Observable<User | number[]> {
        return this.patch(user, 'email').pipe(
            tap((user_: User) => {
                this.setAuthUserEmail(user_);
            }),
            catchError((error) => EMPTY)
        );
    }

    public emailIsValidToChange(params: string) {
        return this.findAll(`change-email/${params}`);
    }

    public updateAuthPassword(user: User): Observable<User | number[]> {
        return this.patch(user, 'password');
    }

    public authState(user: User): Observable<User | number[]> {
        return this.patch(user, 'state').pipe(
            tap((user_: User) => this.setAuthUserState(user_)),
            catchError((error) => EMPTY)
        );
    }

    private updateAuthUserUrl(): void {
        const url = `/painel-de-controle/usuarios/${this.getAuthUserSlug()}`;
        this.breadcrumbsService.setEvent(url);
        this.location.replaceState(url);
    }
}
