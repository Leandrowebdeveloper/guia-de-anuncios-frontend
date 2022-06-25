import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/interface';
import { OnDestroy } from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.page.html',
    styleUrls: ['nav.page.scss'],
})
export class NavPage implements OnInit, OnDestroy {
    public auth: boolean;
    public name: string;
    public state: boolean;
    public avatar: string;
    public userRouterPage: string;
    public $user: Subscription;

    private $avatar: Subscription;
    private user: User;
    private $auth: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.init();
    }

    ngOnDestroy(): void {
        this.$auth.unsubscribe();
        this.$user.unsubscribe();
        this.$avatar.unsubscribe();
    }

    private init(): void {
        this.getUser();
        this.setUserAndAuthentication();
        this.isUserAuthenticated();
        this.getState();
        this.setUser();
        this.toogleAvatar();
    }

    private getUser(): void {
        this.user = this.activatedRoute.snapshot.data?.init;
    }

    private setUserAndAuthentication(): void {
        this.authService.setUserAndAuthentication = this.user;
    }

    private isUserAuthenticated(): Subscription {
        return (this.$auth = this.authService.toggleIsLoggedIn.subscribe(
            (auth: boolean) => (this.auth = auth)
        ));
    }

    /**
     * AVATAR
     */

    private setUser() {
        return (this.$user = this.userService.userObservable().subscribe(
            (user: User) => {
                this.setAvatar(user);
                this.getName(user);
                this.getSlug(user);
            }
        ));
    }

    private getSlug(user: User): void {
        if (user.slug) {
            this.userRouterPage = `painel-de-controle/usuarios/${user.slug}`;
        }
    }

    private getState(): void {
        this.state = this.authService.isLoggedIn;
    }

    private setAvatar(user: User): void {
        this.avatar = user.image.url || './../../assets/avatar.svg';
    }

    private toogleAvatar(): Subscription {
        return (this.$avatar = this.userService.userObservable().subscribe(
            (user: User) => this.setAvatar(user)
        ));
    }

    private getName(user: User): void {
        if (user.firstName && user.lastName) {
            this.name = `${user.firstName} ${user.lastName}`;
        }
    }
}
