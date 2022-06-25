import { catchError } from 'rxjs/operators';
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
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        const url: string = state.url;
        return this.authService.checkLogin(url);
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(route, state);
    }

    resolve(): Observable<User> {
        return this.init.boot().pipe(
            catchError(()=> {
                this.router.parseUrl('/404');
                return EMPTY;
            })
        );
    }

    async canLoad(route: Route) {
        await this.storageService.init();
        const token = await this.storageService.isToken();
        this.init.setToken = token;
        this.authService.isLoggedIn = !!token;
        return this.authService.canLoadResult(route);
    }
}
