import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { User } from 'src/app/interface';
import { GaleryComponent } from 'src/app/components/galery/galery-component';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit, OnDestroy {
    @Input() user: User;
    public avatar: string;
    private $avatar: Subscription;
    constructor(
        private userService: UserService,
        private modalController: ModalController
    ) {}

    ngOnInit() {
        this.toogleAvatar();
    }

    ngOnDestroy(): void {
        this.$avatar.unsubscribe();
    }

    public async addAvatar() {
        const { _csrf, slug } = this.user;
        const modal = await this.modalController.create({
            component: GaleryComponent,
            componentProps: {
                _csrf,
                slug,
            },
        });
        return await modal.present();
    }

    private toogleAvatar(): Subscription {
        return (this.$avatar = this.userService.userObservable.subscribe(
            (user: User) => this.setAvatar(user)
        ));
    }

    private setAvatar(user: User): void {
        this.avatar = user.image.url || './../../../../assets/avatar.svg';
    }
}
