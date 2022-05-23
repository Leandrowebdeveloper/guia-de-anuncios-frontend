import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface';
import { RegisterService } from './../services/register.service';

@Injectable()
/**
 * @file src/app/pages/register/guard/resolve.guard.ts
 * @class RegisterResolver
 * @implements Resolve<User>
 */
export class RegisterResolver implements Resolve<User> {
  constructor(private registerService: RegisterService) {}
  /**
   * @class RegisterResolver
   * @function resolve
   * @param route ActivatedRouteSnapshot
   * @returns Observable<User>
   */
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.registerService.requirement();
  }
}
