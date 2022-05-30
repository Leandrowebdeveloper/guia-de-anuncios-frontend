import { StorageService } from 'src/app/services/storage/storage.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Resolve,
  Route,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { User } from 'src/app/interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InitService } from 'src/app/services/init/init.service';

@Injectable({
  providedIn: 'root',
})
/**
 * @class AuthGuard
 */
export class AuthGuard
  implements CanLoad, CanActivate, CanActivateChild, Resolve<User>
{
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private init: InitService
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
    return this.init.boot();
  }

  async canLoad(route: Route) {
    await this.storageService.init();
    const token = await this.storageService.isToken();
    this.init.setToken = token;
    this.authService.isLoggedIn = !!token;
    return this.authService.canLoadResult(route);
  }
}
