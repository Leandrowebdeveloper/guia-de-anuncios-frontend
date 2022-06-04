import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { LogoutService } from './service/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage {
  private _logout: Subscription
  constructor(
    private navCtrl: NavController,
    private logoutService: LogoutService
  ) {}



  public logout(): Subscription {
    return this._logout = this.logoutService.destroySession().subscribe(()=> this._logout.unsubscribe());
  }

  public back(): void {
    return this.navCtrl.back();
  }
}
