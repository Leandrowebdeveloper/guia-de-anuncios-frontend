import { StorageService } from './../../../../services/storage/storage.service';
import { LoadingService } from 'src/app/utilities/loading/loading.service';
import { MessageService } from 'src/app/utilities/message/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';
import { BehaviorSubject, EMPTY, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Image, User } from 'src/app/interface';
import { Observable } from 'rxjs';
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
        private breadcrumbsService: BreadcrumbsService,
        private loadingService: LoadingService
    ) {
        super(http);
        this.api = `users`;
    }

    public getUserAvatar(): Image {
        return this.$authUser.value?.image;
    }

    public authUserObservable(): Observable<User> {
        return this.$authUser.asObservable();
    }
    public getAuthUser(): User {
        return this.$authUser.value;
    }

    public getAuthUserSlug(): string {
        return this.$authUser.value?.slug;
    }

    public getAuthState(): boolean {
        return this.$authUser.value?.authState;
    }

    public getAuthToken(): string {
        return this.$authUser.value?.token;
    }

    public setAuthSlug(user: User) {
        this.$authUser.value.slug = user.slug;
        this.setAuthUser(this.$authUser.value);
    }

    public getAuthUserLastName() {
        return this.$authUser.value?.lastName;
    }

    public setAuthUserLastName(user: User) {
        this.$authUser.value.lastName = user.lastName;
        this.setAuthUser(this.$authUser.value);
    }

    public getAuthUserFirstName() {
        return this.$authUser.value?.firstName;
    }

    public setAuthUserFirstName(user: User) {
        this.$authUser.value.firstName = user.firstName;
        this.setAuthUser(this.$authUser.value);
    }

    public getAuthUserEmail() {
        return this.$authUser.value?.email;
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
        return `${this.$authUser.value?.firstName} ${this.$authUser.value?.lastName}`;
    }

    public setAuthUser(user: User) {
        this.$authUser.next(user);
    }

    public setAuthAvatar(image: Image) {
        this.$authUser.value.image = image;
        this.setAuthUser(this.$authUser.value);
    }

    public setAuthToken(token: string) {
        this.token = token;
    }

    public setAuthCsrf(csrf: string) {
        this.csrf = csrf;
    }

    public async message(
        user: User,
        loading: Promise<HTMLIonLoadingElement>,
        subscribe?: Subscription,
        time?: number
    ): Promise<number> {
        this.setAuthToken(user.token);
        return await this.messageService.success(
            user.message,
            loading,
            subscribe,
            time
        );
    }

    public async error(
        error: HttpErrorResponse,
        loading: Promise<HTMLIonLoadingElement>,
        subscribe: Subscription
    ) {
        return this.messageService.error(error, loading, subscribe);
    }

    public updateAuthName(user: User): Observable<User> {
        this.setAuthorization(user);
        return this.patch(user, 'name').pipe(
            tap((user_: User) => {
                this.setAuthUserFirstName(user_);
                this.setAuthUserLastName(user_);
                this.setAuthSlug(user_);
                this.updateAuthUserUrl();
            })
        );
    }

    public updateAuthEmail(user: User): Observable<User> {
        return this.patch(user, 'email').pipe(
            tap((user_: User) => {
                this.setAuthUserEmail(user_);
            })
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
            tap((user_: User) => this.setAuthUserState(user_))
        );
    }

    public async showLoading(message: string): Promise<HTMLIonLoadingElement> {
        return await this.loadingService.show(message);
    }

    private setAuthorization(user: User) {
        this.token = user?.token;
    }

    private updateAuthUserUrl(): void {
        const url = `/painel-de-controle/usuarios/${this.getAuthUserSlug()}`;
        this.breadcrumbsService.setEvent(url);
        this.location.replaceState(url);
    }
}
