import { User } from 'src/app/interface';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Route, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})

/**
 * @class AuthService
 */
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private storageService: StorageService,
    private router: Router,
    private navCtrl: NavController,
    private userService: UserService
  ) {}

  public set setUserAndAuthentication(user: User) {
    this.userService.user = user;
    this.isLoggedIn = user.auth;
  }

  public get user() {
    return this.userService.user;
  }

  public set isLoggedIn(value: boolean) {
    this._isLoggedIn.next(value);
  }

  public get isLoggedIn() {
    return this._isLoggedIn.value;
  }

  public get toggleIsLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  public canLoadResult(route: Route): true | UrlTree {
    if (route?.path) {
      return this.checkLogin(`/${route.path}`);
    }
    return true;
  }

  public checkLogin(url: string): true | UrlTree {
    if (this.isLoggedIn && url === '/entrar') {
      return this.router.parseUrl('/painel-de-controle');
    } else if (
      (this.isLoggedIn && url !== '/entrar') ||
      (this.isLoggedIn && url !== '/recuperar-senha') ||
      (this.isLoggedIn && url !== '/cadastrar')
    ) {
      return true;
    } else if (
      (!this.isLoggedIn && url === '/entrar') ||
      (!this.isLoggedIn && url === '/recuperar-senha') ||
      (!this.isLoggedIn && url === '/cadastrar')
    ) {
      return true;
    }
    return this.router.parseUrl('/entrar');
  }

  public unauthenticatedUserAllowLoginRoute(): Promise<boolean> {
    const url = this.router.url;
    if (this.isLoggedIn && url.toLowerCase() === '/entrar') {
      return this.navCtrl.navigateForward('/painel-de-controle');
    }
  }

  public async setToken(user: User): Promise<void> {
    return await this.storageService.create('token', user?.token);
  }
}
