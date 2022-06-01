import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface';
import { RedefinePasswordService } from '../services/redefine-password.service';

@Injectable()
export class RedefinePasswordResolver implements Resolve<User | UrlTree> {
  constructor(
    private router: Router,
    private redefineService: RedefinePasswordService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> | UrlTree {
    if (route.params?.token) {
      return this.redefineService.requirement(route.params?.token);
    }
    return this.router.parseUrl('/');
  }
}
