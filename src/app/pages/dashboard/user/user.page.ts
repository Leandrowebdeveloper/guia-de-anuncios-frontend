import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { ModalController } from '@ionic/angular';
import { NameComponent } from './components/name/name.component';

@Component({
    selector: 'app-user',
    templateUrl: 'user.page.html',
    styleUrls: ['user.page.scss'],
})
export class UserPage implements OnInit {
    public user: User;

    constructor(
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private modalController: ModalController
    ) {}

    ngOnInit(): void {
        this.getUser();
    }

    public getUser(): User {
        return (this.user = this.activatedRoute.snapshot.data.user);
    }

    public async updateName() {
        const { _csrf, firstName, lastName, slug } = this.user;
        const modal = await this.modalController.create({
            component: NameComponent,
            componentProps: {
                _csrf,
                firstName,
                lastName,
                slug,
            },
        });
        return await modal.present();
    }
}
