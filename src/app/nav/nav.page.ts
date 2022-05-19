import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Init } from 'src/app/interface';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.page.html',
  styleUrls: ['nav.page.scss'],
})
export class NavPage implements OnInit {
  public auth: boolean;
  private init: Init[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.setInit();
  }

  private setInit() {
    this.init = this.activatedRoute.snapshot.data?.init;
    this.authService.isAuth(this.init);
    this.authService.isUrlAuth();
    this.isAuth();
  }

  private isAuth(): void {
    this.auth = this.authService.isLoggedIn;
  }
}
