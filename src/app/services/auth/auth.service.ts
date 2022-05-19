import { Init } from 'src/app/interface';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Route, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})

/**
 * @class AuthService
 */
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    public storageService: StorageService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  /**
   * @class AuthService
   * @function set isLoggedIn
   * @type public
   * @param value boolean
   * @readonly Seta se está logado
   * @returns void
   */
  public set isLoggedIn(value: boolean) {
    this._isLoggedIn.next(value);
  }

  /**
   * @class AuthService
   * @function get isLoggedIn
   * @type public
   * @readonly Pega se está logado
   * @returns boolean
   */
  public get isLoggedIn() {
    return this._isLoggedIn.value;
  }

  /**
   * @class AuthService
   * @function get toggleIsLoggedIn
   * @type public
   * @readonly Armazena o valor statico da variavel
   * @returns Observable<boolean>
   */
  public get toggleIsLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  /**
   * @class AuthService
   * @function canLoadResul
   * @type public
   * @readonly Retorna o resultado da rota
   * @param route Route
   * @returns true | UrlTree
   */
  public canLoadResult(route: Route): true | UrlTree {
    if (route?.path) {
      return this.checkLogin(`/${route.path}`);
    }
    return true;
  }

  /**
   * @class AuthService
   * @function checkLogin
   * @type public
   * @readonly Direciona e separa as rotas altenticadas
   * @param url string
   * @returns true | UrlTree
   */
  public checkLogin(url: string): true | UrlTree {
    if (this.isLoggedIn && url === '/login') {
      return this.router.parseUrl('/usuario');
    } else if (
      (this.isLoggedIn && url !== '/login') ||
      (this.isLoggedIn && url !== '/recuperar-senha') ||
      (this.isLoggedIn && url !== '/cadastrar')
    ) {
      return true;
    } else if (
      (!this.isLoggedIn && url === '/login') ||
      (!this.isLoggedIn && url === '/recuperar-senha') ||
      (!this.isLoggedIn && url === '/cadastrar')
    ) {
      return true;
    }
    return this.router.parseUrl('/login');
  }

  /**
   * @class AuthService
   * @function isAuth
   * @type public
   * @readonly Seta se existe um usuário autenticado
   * @param init Init[]
   * @returns void
   */
  public isAuth(init: Init[]) {
    this.isLoggedIn = init.some((_init: Init) => _init.auth === true);
  }

  /**
   * @class AuthService
   * @function isUrlAuth
   * @type public
   * @readonly Verifica se o url passado por parametro tem permição
   * @returns boolean
   */
  public isUrlAuth(): Promise<boolean> {
    const url = this.router.url;
    if (this.isLoggedIn && url.toLowerCase() === '/login') {
      return this.navCtrl.navigateForward('/usuario');
    }
  }

  public async login(): Promise<void> {
    return await this.storageService.create('user', {
      id: 321,
      firstName: 'Leandro',
      lastName: 'Souza',
    });
  }
}
