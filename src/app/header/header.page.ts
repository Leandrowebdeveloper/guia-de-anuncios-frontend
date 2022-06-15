import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/interface/index';
import { Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
  public avatar: string = './../../assets/avatar.svg';
  public name: string;
  public userRouterPage: string[] = ['/painel-de-controle', 'usuarios'];
  private _user$: Observable<User>;

  private _title: string;
  private $user: Subscription;

  constructor(
    private plt: Platform,
    private popoverController: PopoverController,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.init();
    this.title = this.activatedRoute.snapshot.data.breadcrumb;
    this.isPlatformIos();
  }

  ngOnDestroy(): void {
    this.$user.unsubscribe();
  }

  private init() {
    this.setUser();
    this.getUser();
  }

  private get user$(): Observable<User> {
    return this._user$;
  }

  private set user$(value: Observable<User>) {
    this._user$ = value;
  }

  private setUser() {
    return (this.$user = this.userService.userObservable.subscribe(
      (user: User) => {
        this.user$ = of(user);
        this.getAvatar(user);
        this.getName(user);
      }
    ));
  }

  private getAvatar(user: User): void {
    if (user.image.url) {
      this.avatar = user.image.url;
    }
  }

  private getName(user: User): void {
    if (user.firstName && user.lastName) {
      this.name = `${user.firstName} ${user.lastName}`;
    }
  }

  private getUser() {
    return (this.$user = this.user$.subscribe((user: User) =>
      this.user.emit(user)
    ));
  }

  private isPlatformIos(): boolean {
    return (this.hasIos = this.plt.is('ios'));
  }

  public set title(value: string) {
    this._title = value;
  }

  public get title() {
    return this._title;
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
