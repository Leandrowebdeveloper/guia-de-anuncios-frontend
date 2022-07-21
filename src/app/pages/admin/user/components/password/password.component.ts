import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/interface';
import { ModalController } from '@ionic/angular';
import { FormPasswordComponent } from './form/form.component';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
    @Input() user: User;

    constructor(
        private userService: UserService,
        private modalController: ModalController) {}

    public async updateAuthPassword() {
        this.update();
        const { _csrf, password, slug } = this.user;
        const modal = await this.modalController.create({
            component: FormPasswordComponent,
            componentProps: {
                user: {
                    _csrf,
                    password,
                    passwordConfirmation: null,
                    passwordCurrent: null,
                    slug,
                },
            },
        });
        return await modal.present();
    }
    private update(): void {
        this.user.slug = this.userService.getAuthUserSlug();
    }
}
