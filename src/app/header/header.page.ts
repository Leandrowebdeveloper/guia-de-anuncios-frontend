import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { User } from 'src/app/interface/index';
import { Observable, of, Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})

/**
 * @class HeaderPage
 * @implements OnInit
 */
export class HeaderPage implements OnInit, OnDestroy {
  @Output() user = new EventEmitter<User>(undefined);
  public hasIos: boolean;
  public avatar: string;
  public name: string;
  public state: boolean;
  private _user$: Observable<User>;

  private $user: Subscription;

  constructor(
    private plt: Platform,
    private popoverController: PopoverController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.init();
    this.getState();
    this.isPlatformIos();
  }

  ngOnDestroy(): void {
    this.$user.unsubscribe();
  }

  private init() {
    this.getState();
  }

  private get user$(): Observable<User> {
    return this._user$;
  }

  private set user$(value: Observable<User>) {
    this._user$ = value;
  }


  private getState(): void {
    this.state = this.authService.isLoggedIn;
  }


  private isPlatformIos(): boolean {
    return (this.hasIos = this.plt.is('ios'));
  }


  async menuShow(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
}
