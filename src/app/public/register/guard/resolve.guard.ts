import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface';
import { RegisterService } from '../services/register.service';

@Injectable()
export class RegisterResolver implements Resolve<User> {
  constructor(private registerService: RegisterService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.registerService.requirement();
  }
}
