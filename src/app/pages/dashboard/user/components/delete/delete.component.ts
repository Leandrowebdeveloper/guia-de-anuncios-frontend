import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/interface';
import { ModalController } from '@ionic/angular';
import { FormDeleteComponent } from './form/form.component';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
    @Input() user: User;

    constructor(
        private userService: UserService,
        private modalController: ModalController) {}

    public async destroy() {
        this.update();
        const { _csrf, password, slug } = this.user;
        const modal = await this.modalController.create({
            component: FormDeleteComponent,
            componentProps: {
                user: {
                    _csrf,
                    password,
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
