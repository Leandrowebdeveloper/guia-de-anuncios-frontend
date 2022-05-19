import { Injectable } from '@angular/core';
import { RecoverService } from '../services/recover.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface';

@Injectable()
export class RecoverResolver implements Resolve<User> {

  constructor(private recoverService: RecoverService){}
  resolve(route: ActivatedRouteSnapshot): Observable<User> | User {
    return this.recoverService.requirement();
  }
}
