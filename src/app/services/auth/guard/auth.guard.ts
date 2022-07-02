import { catchError, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Resolve,
    Route,
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
    constructor(
        private storageService: StorageService,
        private authService: AuthService,
        private init: InitService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        authState: RouterStateSnapshot
    ): boolean | UrlTree {
        const url: string = authState.url;
        return this.authService.checkLogin(url);
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
            tap((user: User) => this.authService.confirmAuthorization(user)),
            catchError(() => {
                this.router.parseUrl('/404');
                return EMPTY;
            })
        );
    }

    async canLoad(route: Route) {
        await this.storageService.init();
        const token = await this.storageService.isToken();
        this.init.setAuthToken = token;
        this.authService.isLoggedIn = !!token;
        return this.authService.canLoadResult(route);
    }
}
