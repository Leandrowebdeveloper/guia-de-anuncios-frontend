import { Subscription } from 'rxjs';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AttrButton } from 'src/app/pages/public/system-access/components/buttons/interface';
import { User } from 'src/app/interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { HelpsService } from 'src/app/services/helps/helps.service';

@Component({
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormEmailComponent implements OnInit {
    @Input() user: User;

    public attrButtonPage: AttrButton[];
    public readonly attrButton: AttrButton = {
        route: '/email',
        icon: 'mail',
        label: 'Enviar',
        fill: false,
        aria: 'Enviar novo email.',
        title: 'Enviar novo email.',
    };

    public config: object;
    private form: FormGroup;
    private $email: Subscription;
    constructor(
        private helpService: HelpsService,
        private modalController: ModalController,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    public importForm(event: FormGroup): FormGroup {
        return (this.form = event);
    }

    public onSubmit(event: FormGroup): Subscription {
        const loading = this.userService.showLoading('Alterando email...');
        event.value.slug = this.userService.getAuthUserSlug();
        return (this.$email = this.userService
            .updateAuthEmail(event.value)
            .subscribe(
                (user: User) => this.messsage(user, loading),
                (error: HttpErrorResponse) =>
                    this.userService.error(error, loading, this.$email)
            ));
    }

    private messsage(
        user: User,
        loading: Promise<HTMLIonLoadingElement>
    ): Promise<number> {
        this.helpService.delay(() => this.modalController.dismiss(), 2500);
        return this.userService.message(user, loading, this.$email);
    }

    private getData(): void {
        this.config = { ...this.user };
    }
}
