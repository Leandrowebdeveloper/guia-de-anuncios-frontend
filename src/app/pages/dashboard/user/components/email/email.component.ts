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

    constructor(private modalController: ModalController) {}

    public async updateEmail() {
        const { _csrf, email, slug } = this.user;
        const modal = await this.modalController.create({
            component: FormEmailComponent,
            componentProps: {
                user: { _csrf, email, slug },
            },
        });
        return await modal.present();
    }
}
