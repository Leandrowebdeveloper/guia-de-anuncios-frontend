import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/interface';
import { ModalController } from '@ionic/angular';
import { FormEmailComponent } from './form/form.component';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss'],
})
export class EmailComponent {
    @Input() user: User;

    constructor(
        private userService: UserService,
        private modalController: ModalController) {}

    public async updateAuthEmail() {
        this.setAuthSlug();
        this.setAuthEmail();
        const { _csrf, email, slug } = this.user;
        const modal = await this.modalController.create({
            component: FormEmailComponent,
            componentProps: {
                user: { _csrf, email, slug },
            },
        });
        return await modal.present();
    }

    private setAuthSlug(): void {
        this.user.slug = this.userService.getAuthUserSlug();
    }

    private setAuthEmail(): void {
        this.user.email = this.userService.getAuthUserEmail();
    }
}
