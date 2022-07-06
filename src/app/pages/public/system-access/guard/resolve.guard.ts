import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { User } from 'src/app/interface';
import { LoginService } from '../services/login/login.service';
import { RecoverService } from '../services/recover/recover.service';
import { RegisterService } from '../services/register/register.service';

@Injectable({ providedIn: 'root' })
export class SystemAccessResolver implements Resolve<User> {
  constructor(
    private recoverService: RecoverService,
    private loginService: LoginService,
    private registerService: RegisterService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const router = this.activeRoute(route);
    switch (router) {
      case 'entrar':
        return this.loginService.requirement().pipe(catchError((): Observable<never>=> {
            this.router.parseUrl('/404');
             return EMPTY;
            }));
      case 'recuperar-senha':
        return this.recoverService.requirement().pipe(catchError((): Observable<never>=> {
            this.router.parseUrl('/404');
             return EMPTY;
            }));
      case 'cadastrar':
        return this.registerService.requirement().pipe(catchError((): Observable<never>=> {
            this.router.parseUrl('/404');
             return EMPTY;
            }));
    }
  }

  private activeRoute(route: ActivatedRouteSnapshot): string {
    return route.parent.routeConfig.path;
  }
}
