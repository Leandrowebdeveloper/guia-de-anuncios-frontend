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
    public avatar: string;
    public userRouterPage: string;
    public $user: Subscription;

    private $avatar: Subscription;
    private $auth: Subscription;
    private user: User;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.init();
    }

    ngOnDestroy(): void {
        this.$user.unsubscribe();
        this.$avatar.unsubscribe();
        this.$auth.unsubscribe();
    }

    private init(): void {
        this.getAuthUser();
        this.setUserAndAuthentication();
        this.setAuthUser();
        this.toogleAvatar();
        this.toogleAuth();
    }

    private getAuthUser(): void {
        this.user = this.activatedRoute.snapshot.data?.init;
    }

    private setUserAndAuthentication(): void {
        this.authService.setUserAndAuthentication = this.user;
    }


    /**
     * AVATAR
     */

    private setAuthUser() {
        return (this.$user = this.userService.authUserObservable().subscribe(
            (user: User) => {
                this.setAuthAvatar(user);
                this.getAuthUserName(user);
                this.getAuthUserSlug(user);
            }
        ));
    }

    private getAuthUserSlug(user: User): void {
        if (user && user?.slug) {
            this.userRouterPage = `painel-de-controle/usuarios/${user.slug}`;
        }
    }

    private toogleAuth(): void {
        this.$auth = this.authService.toggleIsLoggedIn.subscribe((auth: boolean)=> this.auth = auth);
    }

    private setAuthAvatar(user: User): void {
        if(user) {
            this.avatar = user.image?.url || './../../assets/avatar.svg';
        }
    }

    private toogleAvatar(): Subscription {
        return (this.$avatar = this.userService.authUserObservable().subscribe(
            (user: User) => this.setAuthAvatar(user)
        ));
    }

    private getAuthUserName(user: User): void {
        if (user && user?.firstName && user?.lastName) {
            this.name = `${user.firstName} ${user.lastName}`;
        }
    }
}
