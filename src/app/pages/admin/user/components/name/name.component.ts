import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/interface';
import { ModalController } from '@ionic/angular';
import { FormNameComponent } from './form/form.component';

@Component({
    selector: 'app-name',
    templateUrl: './name.component.html',
    styleUrls: ['./name.component.scss'],
})
export class NameComponent {
    @Input() user: User;

    constructor(
        private userService: UserService,
        private modalController: ModalController) {}

    public async updateAuthName() {
        this.update();
        const { _csrf, firstName, lastName, slug } = this.user;
        const modal = await this.modalController.create({
            component: FormNameComponent,
            componentProps: {
                user: { _csrf, firstName, lastName, slug },
            },
        });
        return await modal.present();
    }

    private update(): void {
        this.user.slug = this.userService.getAuthUserSlug();
        this.user.firstName = this.userService.getAuthUserFirstName();
        this.user.lastName = this.userService.getAuthUserLastName();
    }
}
