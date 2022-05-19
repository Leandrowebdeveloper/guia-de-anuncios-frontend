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

import { Init } from 'src/app/interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InitService } from 'src/app/services/init/init.service';

@Injectable({
  providedIn: 'root',
})
/**
 * @class AuthGuard
 */
export class AuthGuard
  implements CanLoad, CanActivate, CanActivateChild, Resolve<Init[]>
{
  constructor(private authService: AuthService, private init: InitService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const url: string = state.url;
    // this.authService.login().then();
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

  resolve(): Observable<Init[]>  {
      this.init.setToken = this.authService.storageService.getToken;
      return this.init.boot();
  }

  canLoad(route: Route): true | UrlTree {
    return this.authService.canLoadResult(route);
  }



}
