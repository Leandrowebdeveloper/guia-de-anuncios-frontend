import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/interface';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { ModalController } from '@ionic/angular';
import { GaleryComponent } from 'src/app/components/galery/galery-component';

@Component({
  selector: 'app-user',
  templateUrl: 'user.page.html',
  styleUrls: ['user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {
  private _user: User;
  public status: boolean;
  public avatar: string;
  private $state: Subscription;
  private $avatar: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.$avatar.unsubscribe();
  }

  private init(): void {
    this.getStatus();
    this.toogleAvatar();
  }

  public get user(): User {
    return (this._user = this.activatedRoute.snapshot.data.user);
  }

  public set user(user: User) {
    this._user = user;
  }

  public set userState(user: User) {
    this._user.state = user.state;
  }

  public getStatus(): void {
    this.status = this.user.state;
  }

  public toggleState() {
    return (this.$state = this.userService.state(this.user).subscribe(
      (user: User) => this.successState(user),
      (error) => this.userService.error(error, this.$state)
    ));
  }

  private toogleAvatar(): Subscription {
    return (this.$avatar = this.userService.userObservable.subscribe(
      (user: User) => this.setAvatar(user)
    ));
  }

  private setAvatar(user: User): void {
    this.avatar = user.image.url || './../../../../assets/avatar.svg';
  }

  private successState(user: User): void {
    this.setState(user);
    this.userService.messageState(user);
  }

  private setState(user: User): void {
    this.userState = user;
    this.updateSate(user);
    this.updateUser();
  }

  private updateSate(user: User): void {
    this.status = user.state;
  }

  private updateUser(): void {
    this.userService.user = this.user;
  }

  /*********************************
   ********* IMAGE *****************
   *********************************/

  public async addAvatar() {
    const { _csrf, slug } = this.user;
    const modal = await this.modalController.create({
      component: GaleryComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        _csrf,
        slug,
      },
    });
    return await modal.present();
  }
}
