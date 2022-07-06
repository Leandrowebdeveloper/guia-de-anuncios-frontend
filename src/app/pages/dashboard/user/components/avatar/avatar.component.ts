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
        this.setAuthSlug();
        const { _csrf, slug, image } = this.user;
        const modal = await this.modalController.create({
            component: GaleryComponent,
            componentProps: {
                _csrf,
                slug,
                image,
            },
        });
        return await modal.present();
    }

    private setAuthSlug(): void {
        this.user.slug = this.userService.getAuthUserSlug();
    }

    private toogleAvatar(): Subscription {
        return (this.$avatar = this.userService
            .authUserObservable()
            .subscribe((user: User) => this.setAuthAvatar(user)));
    }

    private setAuthAvatar(user: User): void {
        if (user) {
            this.avatar = user?.image?.url || './../../../../assets/avatar.svg';
            this.updateImage(user);
        }
    }

    private updateImage(user: User): void {
        if (user) {
            this.user.image = user.image;
        }
    }
}
