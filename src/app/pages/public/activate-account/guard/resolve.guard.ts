import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';

@Injectable()
export class ActivateAccountResolver implements Resolve<string | UrlTree> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): string | UrlTree {
    if (route.params?.token && typeof route.params?.token === 'string') {
      return route.params?.token;
    }
    return this.router.parseUrl('/');
  }
}
