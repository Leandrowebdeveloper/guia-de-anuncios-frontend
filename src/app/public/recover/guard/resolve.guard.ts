import { Injectable } from '@angular/core';
import { RecoverService } from '../services/recover.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface';

@Injectable()
/**
 * @class RecoverResolver
 * @implements Resolve<User>
 */
export class RecoverResolver implements Resolve<User> {
  constructor(private recoverService: RecoverService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.recoverService.requirement();
  }
}
