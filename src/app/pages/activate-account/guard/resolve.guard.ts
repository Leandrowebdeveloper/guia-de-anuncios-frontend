import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';

@Injectable()
/**
 * @class ActivateAccountResolver
 * @implements Resolve<string | UrlTree>
 */
export class ActivateAccountResolver implements Resolve<string | UrlTree> {
  constructor(private router: Router) {}
  /**
   * @class ActivateAccountResolver
   * @function resouve
   * @param route ActivatedRouteSnapshot
   * @returns string | UrlTree
   */
  resolve(route: ActivatedRouteSnapshot): string | UrlTree {
    if (route.params?.token) {
      return route.params?.token;
    }
    return this.router.parseUrl('/');
  }
}
