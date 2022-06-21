import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.params?.id;
    return this.userService.requirement(id);
  }
}
