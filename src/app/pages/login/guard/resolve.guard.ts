import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface';

@Injectable()
export class LoginResolver implements Resolve<User> {

  constructor(private loginService: LoginService){}
  resolve(route: ActivatedRouteSnapshot): Observable<User> | User {
    return this.loginService.requirement();
  }
}
