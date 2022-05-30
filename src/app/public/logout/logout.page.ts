import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogoutService } from './service/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit, OnDestroy {
  private _logout: Subscription
  constructor(
    private navCtrl: NavController,
    private logoutService: LogoutService
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this._logout.unsubscribe();
  }

  public logout(): Subscription {
    return this._logout = this.logoutService.destroySession().subscribe();
  }

  public back(): void {
    return this.navCtrl.back();
  }
}
