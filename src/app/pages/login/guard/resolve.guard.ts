import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface';

@Injectable()
/**
 * @class LoginResolver
 * @implements Resolve<User>
 */
export class LoginResolver implements Resolve<User> {

  constructor(private loginService: LoginService){}
  /**
   * @class LoginResolver
   * @function resolve
   * @param route ActivatedRouteSnapshot
   * @returns Observable<User>
   */
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.loginService.requirement();
  }
}
