import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Init } from 'src/app/interface';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.page.html',
  styleUrls: ['nav.page.scss'],
})
/**
 * @file /src/app/nav/nav.page.ts
 * @class NavPage
 * @implements OnInit
 */
export class NavPage implements OnInit {
  public auth: boolean; // Usuário autenticado
  private init: Init[]; // Os dados de inicialização
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.setInit();
  }

  /**
   * @class NavPage
   * @function setInit
   * @readonly Inicializa os funções e variaveis
   * @type void
   * @returns void
   */
  private setInit(): void {
    this.init = this.activatedRoute.snapshot.data?.init;
    this.authService.isAuth(this.init);
    this.authService.isUrlAuth();
    this.isAuth();
  }

  /**
   * @class NavPage
   * @function isAuth
   * @readonly Seta o valor do usuário autenticado
   * @type void
   * @returns void
   */
  private isAuth(): void {
    this.auth = this.authService.isLoggedIn;
  }
}
