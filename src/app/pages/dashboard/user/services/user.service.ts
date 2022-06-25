import { MessageService } from 'src/app/utilities/message/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';
import { BehaviorSubject, EMPTY, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
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
    private $user = new BehaviorSubject<User>(undefined);

    constructor(
        http: HttpClient,
        private messageService: MessageService,
        private storageService: StorageService,
        private location: Location,
        private breadcrumbsService: BreadcrumbsService
    ) {
        super(http, `${environment.api}api/users`);
    }

    public getAvatar(): Image {
        return this.$user.value.image;
    }

    public userObservable(): Observable<User> {
        return this.$user.asObservable();
    }
    public getUser(): User {
        return this.$user.value;
    }

    public getSlug(): string {
        return this.$user.value.slug;
    }

    public getState(): boolean {
        return this.$user.value.state;
    }

    public setSlug(user: User) {
        this.$user.value.slug = user.slug;
        this.setUser(this.$user.value);
    }

    public getLastName() {
        return this.$user.value.lastName;
    }

    public setLastName(user: User) {
        this.$user.value.lastName = user.lastName;
        this.setUser(this.$user.value);
    }

    public getFirstName() {
        return this.$user.value.firstName;
    }

    public setFirstName(user: User) {
        this.$user.value.firstName = user.firstName;
        this.setUser(this.$user.value);
    }

    public setState(user: User) {
        this.$user.value.state = user.state;
        this.setUser(this.$user.value);
    }

    public getName(): string {
        return `${this.$user.value.firstName} ${this.$user.value.lastName}`;
    }

    public setUser(user: User) {
        this.$user.next(user);
    }

    public setAvatar(image: Image) {
        this.$user.value.image = image;
        this.setUser(this.$user.value);
    }

    public setToken() {
        this.token = this.storageService.getToken;
    }

    public setCsrf(csrf: string) {
        this.csrf = csrf;
    }

    public async message(user: User): Promise<number> {
        return await this.messageService.success(user.message, 1000);
    }

    public error(error: HttpErrorResponse, subscribe: Subscription) {
        subscribe.unsubscribe();
        return this.messageService.error(error);
    }

    public updateName(user: User): Observable<User | number[]> {
        return this.patch(user, 'name').pipe(
            tap((user_: User) => {
                this.setFirstName(user_);
                this.setLastName(user_);
                this.setSlug(user_);
                this.updateUrl();
            }),
            catchError((error) => EMPTY)
        );
    }

    public state(user: User): Observable<User | number[]> {
        return this.patch(user, 'state').pipe(
            tap((user_: User) => this.setState(user_)),
            catchError((error) => EMPTY)
        );
    }

    private updateUrl(): void {
        const url = `/painel-de-controle/usuarios/${this.getSlug()}`;
        this.breadcrumbsService.setEvent(url);
        this.location.replaceState(url);
    }
}
