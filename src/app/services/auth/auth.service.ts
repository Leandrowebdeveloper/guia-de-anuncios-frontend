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
    constructor(private router: Router, private navCtrl: NavController) {}

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
        if (user) {
            this.isLoggedIn = user?.auth;
        }
    }

    public unauthenticatedUserAllowLoginRoute(): Promise<boolean> {
        const url = this.router.url;
        if (this.isLoggedIn && url.toLowerCase() === '/entrar') {
            return this.navCtrl.navigateForward('/painel-de-controle');
        } else {
            return this.navCtrl.navigateForward('/painel-de-controle/admin');
        }
    }

    public canLoadResult(route: Route): boolean | UrlTree {
        if (route?.path) {
            return this.checkLogin(`/${route.path}`);
        }
        return true;
    }

    public checkLogin(url: string, user?: User): boolean | UrlTree {
        const toogleDashboard = this.toogleDashboard(user);
        const login = this.regex('/entrar');
        const admin = this.regex('/entrar/admin');
        const adminDashboard = this.regex('/painel-de-controle/admin');
        const dashboard = this.regex('/painel-de-controle');
        const recover = this.regex('/recuperar-senha');
        const register = this.regex('/cadastrar');

        if (this.isLoggedIn) {
            if (user?.level === '1' && adminDashboard.test(url)) {
                return true;
            } else if (user?.level === '1' && dashboard.test(url)) {
                this.navCtrl.navigateForward(toogleDashboard);
                return false;
            } else if (user?.level === '2' && adminDashboard.test(url)) {
                this.navCtrl.navigateForward(toogleDashboard);
                return false;
            }

            if (login.test(url) || admin.test(url)) {
                return this.router.parseUrl(toogleDashboard);
            } else if (
                this.denyIncomingURL(login, url, recover, admin, register)
            ) {
                return true;
            }
        } else {
            if (this.acceptIncomingURL(login, url, admin, recover, register)) {
                return true;
            } else {
                return this.router.parseUrl('/entrar');
            }
        }
    }

    private acceptIncomingURL(
        login: RegExp,
        url: string,
        admin: RegExp,
        recover: RegExp,
        register: RegExp
    ): boolean {
        return (
            login.test(url) ||
            admin.test(url) ||
            recover.test(url) ||
            register.test(url)
        );
    }

    private denyIncomingURL(
        login: RegExp,
        url: string,
        recover: RegExp,
        admin: RegExp,
        register: RegExp
    ): boolean {
        return (
            !login.test(url) ||
            !recover.test(url) ||
            !admin.test(url) ||
            !register.test(url)
        );
    }

    private toogleDashboard(
        user: User
    ): '/painel-de-controle/admin' | '/painel-de-controle' {
        return user?.level === '1'
            ? '/painel-de-controle/admin'
            : '/painel-de-controle';
    }

    private regex(value: string): RegExp {
        return new RegExp(value, 'g');
    }
}
