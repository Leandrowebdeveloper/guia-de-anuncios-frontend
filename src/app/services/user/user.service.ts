import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user = new BehaviorSubject<User>(undefined);
  constructor() {}

  public set user(user: User) {
    this._user.next(user);
  }

  public get user() {
    return this._user.value;
  }

  public get userObservable(): Observable<User> {
    return this._user.asObservable();
  }
}
