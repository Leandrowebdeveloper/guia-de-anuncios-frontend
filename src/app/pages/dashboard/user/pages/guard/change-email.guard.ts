import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    Router,
    UrlTree,
} from '@angular/router';
import { User } from 'src/app/interface';

@Injectable()
export class ChangeEmailResolver implements Resolve<User | UrlTree> {
    constructor(private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): any | UrlTree {
        const { token, id } = route.params;
        if (token && id) {
            return { token, slug: id };
        }
        return this.router.parseUrl('/');
    }
}
