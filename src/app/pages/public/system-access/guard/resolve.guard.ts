import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface';
import { LoginService } from '../services/login/login.service';
import { RecoverService } from '../services/recover/recover.service';
import { RegisterService } from '../services/register/register.service';

@Injectable()
export class SystemAccessResolver implements Resolve<User> {
  constructor(
    private recoverService: RecoverService,
    private loginService: LoginService,
    private registerService: RegisterService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const router = this.activeRoute(route);
    switch (router) {
      case 'entrar':
        return this.loginService.requirement();
      case 'recuperar-senha':
        return this.recoverService.requirement();
      case 'cadastrar':
        return this.registerService.requirement();
    }
  }

  private activeRoute(route: ActivatedRouteSnapshot): string {
    return route.parent.routeConfig.path;
  }
}
