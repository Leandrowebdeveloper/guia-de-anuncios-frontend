import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
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
export class HeaderPage implements OnInit {
    public hasIos: boolean;
    public avatar: string;
    public name: string;
    public state: boolean;

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

    private init() {
        this.getState();
    }

    private getState(): void {
        this.state = this.authService.isLoggedIn;
    }

    private isPlatformIos(): boolean {
        return (this.hasIos = this.plt.is('ios'));
    }
}
