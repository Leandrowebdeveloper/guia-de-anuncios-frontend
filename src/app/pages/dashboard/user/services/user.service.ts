import { LoadingService } from 'src/app/utilities/loading/loading.service';
import { MessageService } from 'src/app/utilities/message/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Image, User } from 'src/app/interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { BreadcrumbsService } from 'src/app/header/breadcrumbs/service/breadcrumbs.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelpsService } from 'src/app/services/helps/helps.service';
import { NavController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class UserService extends HttpService<User> {
    private $authUser = new BehaviorSubject<User>(undefined);
    private api$: Subscription;
    constructor(
        http: HttpClient,
        public storageService: StorageService,
        private messageService: MessageService,
        private location: Location,
        private breadcrumbsService: BreadcrumbsService,
        private loadingService: LoadingService,
        private authService: AuthService,
        private helpsService: HelpsService,
        private navCtrl: NavController
    ) {
        super(http, storageService);
        this.setApi();
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

    public setAuthSlug(user: User) {
        this.$authUser.value.slug = user?.slug;
        this.setAuthUser(this.$authUser.value);
    }

    public getAuthUserLastName() {
        return this.$authUser.value?.lastName;
    }

    public setAuthUserLastName(user: User) {
        this.$authUser.value.lastName = user?.lastName;
        this.setAuthUser(this.$authUser.value);
    }

    public getAuthUserFirstName() {
        return this.$authUser.value?.firstName;
    }

    public setAuthUserFirstName(user: User) {
        this.$authUser.value.firstName = user?.firstName;
        this.setAuthUser(this.$authUser.value);
    }

    public getAuthUserLevel() {
        return this.$authUser.value?.level;
    }

    public getAuthUserEmail() {
        return this.$authUser.value?.email;
    }

    public setAuthUserEmail(user: User) {
        this.$authUser.value.email = user?.email;
        this.setAuthUser(this.$authUser.value);
    }

    public setAuthUserState(user: User) {
        this.$authUser.value.authState = user?.authState;
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

    public setAuthCsrf(csrf: string) {
        this.csrf = csrf;
    }

    public async message(
        user: User,
        loading: Promise<HTMLIonLoadingElement>,
        subscribe?: Subscription,
        time?: number
    ): Promise<number> {
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

    public destroyAuthUser(user: User): Observable<User> {
        return this.destroy(user).pipe(
            tap((user_: User) => {
                this.authService.setUserAndAuthentication = user_;
                this.setAuthUser(user_);
                this.clearsSessionAndDatabaseStorage();
                return this.goToLoginPage();
            })
        );
    }

    public authState(user: User): Observable<User | number[]> {
        return this.patch(user, 'state').pipe(
            tap((user_: User) => this.setAuthUserState(user_))
        );
    }

    public async showLoading(message: string): Promise<HTMLIonLoadingElement> {
        return await this.loadingService.show(message);
    }

    private updateAuthUserUrl(): void {
        const isAdmin = this.getAuthUserLevel() === '2' ? '' : `/admin`;
        const url = `/painel-de-controle${isAdmin}/usuario/${this.getAuthUserSlug()}`;
        this.breadcrumbsService.setEvent(url);
        this.location.replaceState(url);
    }

    private setApi(): Subscription {
       return this.api$ = this.authUserObservable().subscribe((user: User) => {
            if (!/[user|users]/g.test(this.api) && user?.level) {
                this.api = user?.level === '2' ? `user` : `users`;
                setTimeout(() => this.api$.unsubscribe(), 2000);
            }
        });
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

    private async goToLoginPage(): Promise<number> {
        return this.helpsService.delay(
            async () => await this.navCtrl.navigateForward('/entrar'),
            2500
        );
    }

}
