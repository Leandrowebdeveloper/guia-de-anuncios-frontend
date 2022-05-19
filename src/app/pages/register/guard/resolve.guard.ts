import { Injectable } from '@angular/core';
import { RegisterService } from './../services/register.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface';

@Injectable()
export class RegisterResolver implements Resolve<User> {

  constructor(private registerService: RegisterService){}
  resolve(route: ActivatedRouteSnapshot): Observable<User> | User {
    return this.registerService.requirement();
  }
}
