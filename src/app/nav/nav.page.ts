import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/interface';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.page.html',
  styleUrls: ['nav.page.scss'],
})
export class NavPage implements OnInit, OnDestroy {
  public auth: boolean;
  private user: User;
  private $auth: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.init();
  }

  ngOnDestroy(): void {
    this.$auth.unsubscribe();
  }

  private init(): void {
    this.getUser();
    this.setUserAndAuthentication();
    this.isUserAuthenticated();
  }

  private getUser(): void {
    this.user = this.activatedRoute.snapshot.data?.init;
  }

  private setUserAndAuthentication(): void {
    this.authService.setUserAndAuthentication = this.user;
  }

  private isUserAuthenticated(): Subscription {
    return (this.$auth = this.authService.toggleIsLoggedIn.subscribe(
      (auth: boolean) => (this.auth = auth)
    ));
  }
}
