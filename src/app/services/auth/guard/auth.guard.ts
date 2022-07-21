import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Resolve,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

import { User } from 'src/app/interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InitService } from 'src/app/services/init/init.service';

@Injectable({
    providedIn: 'root',
})
/**
 * @class AuthGuardi
 */
export class AuthGuard
    implements CanLoad, CanActivate, CanActivateChild, Resolve<User>
{
    private url: string;
    constructor(
        private storageService: StorageService,
        private authService: AuthService,
        private userService: UserService,
        private init: InitService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        authState: RouterStateSnapshot
    ): boolean | UrlTree {
        this.url = authState?.url;
        return this.authService.checkLogin(this.url);
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        authState: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(route, authState);
    }

    resolve(): Observable<User> {
        return this.init.boot().pipe(
            tap((user: User) => this.confirmAuthenticationAndSetUser(user)
            ),
            catchError(() => {
                this.router.navigate(['/erro']);
                return EMPTY;
            })
        );
    }

    async canLoad(): Promise<boolean> {
        await this.storageService.init();
        await this.storageService.isToken();
        this.authService.isLoggedIn = !!this.storageService.getToken;
        return true;
    }

    private confirmAuthenticationAndSetUser(user: User): void {
        this.confirmAuthorization(user);
        this.userService.setAuthUser(user);
    }

    private confirmAuthorization(user: User): boolean |  UrlTree {
        if (!user?.auth) {
            this.authService.isLoggedIn = false;
            this.storageService.destroy('token');
            return this.router.parseUrl('/inicio');
        }
        return this.authService.checkLogin(this.url);
    }
}
