import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    Router,
    UrlTree,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ActivateAccountResolver implements Resolve<string | UrlTree> {
    constructor(private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): string | UrlTree {
        const { token } = route.params;
        if (token && typeof token === 'string') {
            return token;
        }
        return this.router.parseUrl('/');
    }
}
