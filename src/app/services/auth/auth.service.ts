import { User } from 'src/app/interface';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Route, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

/**
 * @class AuthService
 */
export class AuthService {
    private $isLoggedIn = new BehaviorSubject<boolean>(false);
    constructor(
        private router: Router,
        private navCtrl: NavController,
    ) {}


    public get toggleIsLoggedIn(): Observable<boolean> {
        return this.$isLoggedIn.asObservable();
    }

    public get isLoggedIn() {
        return this.$isLoggedIn.value;
    }

    public set isLoggedIn(value: boolean) {
        this.$isLoggedIn.next(value);
    }

    public set setUserAndAuthentication(user: User) {
        if(user) {
            this.isLoggedIn = user?.auth;
        }
    }

    public unauthenticatedUserAllowLoginRoute(): Promise<boolean> {
        const url = this.router.url;
        if (this.isLoggedIn && url.toLowerCase() === '/entrar') {
            return this.navCtrl.navigateForward('/painel-de-controle');
        }
    }

    public canLoadResult(route: Route): true | UrlTree {
        if (route?.path) {
            return this.checkLogin(`/${route.path}`);
        }
        return true;
    }

    public checkLogin(url: string): true | UrlTree {
        const login = this.regex('/entrar');
        const recover = this.regex('/recuperar-senha');
        const register = this.regex('/cadastrar');
        if (this.isLoggedIn) {
            if (login.test(url)) {
                return this.router.parseUrl('/painel-de-controle');
            } else if (
                !login.test(url) ||
                !recover.test(url) ||
                !register.test(url)
            ) {
                return true;
            }
        } else {
            if (login.test(url) || recover.test(url) || register.test(url)) {
                return true;
            } else {
                return this.router.parseUrl('/entrar');
            }
        }
    }

    public confirmAuthorization(user: User): void {
        if (user.auth) {
            this.isLoggedIn = user.auth;
        }
        this.isLoggedIn = false;
        this.router.parseUrl('/entrar');
    }

    private regex(value: string): RegExp {
        return new RegExp(value, 'g');
    }
}
