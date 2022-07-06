import { Component, OnInit } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from 'src/app/services/auth/auth.service';

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
    public hasIos: boolean;
    public avatar: string;
    public name: string;
    public authState: boolean;

    constructor(
        private plt: Platform,
        private popoverController: PopoverController,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.init();
        this.getAuthState();
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
        this.getAuthState();
    }

    private getAuthState(): void {
        this.authState = this.authService.isLoggedIn;
    }

    private isPlatformIos(): boolean {
        return (this.hasIos = this.plt.is('ios'));
    }
}
