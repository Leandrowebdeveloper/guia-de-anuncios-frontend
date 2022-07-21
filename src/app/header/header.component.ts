import { User } from 'src/app/interface';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

/**
 * @class HeaderComponent
 * @implements OnInit
 */
export class HeaderComponent implements OnInit {
    public auth: boolean;
    public hasIos: boolean;
    public avatar: string;
    public name: string;
    public url: string;

    private $auth: Subscription;
    private $url: Subscription;

    constructor(
        private plt: Platform,
        private popoverController: PopoverController,
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.init();
        this.isPlatformIos();
        this.getUrl();
    }

    public async menuShow(ev: any) {
        const popover = await this.popoverController.create({
            component: MenuComponent,
            cssClass: 'my-custom-class',
            event: ev,
            translucent: true,
        });
        await popover.present();

        const { role } = await popover.onDidDismiss();
    }

    private getUrl(){
       this.$url = this.userService.authUserObservable().subscribe((user: User)=>
          this.url =  user?.level === '1' ? '/painel-de-controle/admin' : '/painel-de-controle'
        );
    }

    private init() {
        this.toogleAuth();
    }

    private toogleAuth() {
        this.$auth = this.authService.toggleIsLoggedIn.subscribe(
            (auth: boolean) => (this.auth = auth)
        );
    }

    private isPlatformIos(): boolean {
        return (this.hasIos = this.plt.is('ios'));
    }
}
