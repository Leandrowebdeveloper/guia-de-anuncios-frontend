import { Subscription } from 'rxjs';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AttrButton } from 'src/app/pages/public/system-access/components/buttons/interface';
import { User } from 'src/app/interface';
import { HttpErrorResponse } from '@angular/common/http';
import { HelpsService } from 'src/app/services/helps/helps.service';
import { ModalController } from '@ionic/angular';

@Component({
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormDeleteComponent implements OnInit {
    @Input() user: User;

    public attrButtonPage: AttrButton[];
    public readonly attrButton: AttrButton = {
        route: '/destroy',
        icon: 'trash',
        label: 'Excluir usuário',
        fill: false,
        aria: 'Excluir usuário.',
        title: 'Excluir usuário.',
    };

    public config: object;
    private form: FormGroup;
    private $destroy: Subscription;
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
        const loading = this.userService.showLoading('Alterando senha...');
        event.value.slug = this.userService.getAuthUserSlug();
        return (this.$destroy = this.userService
            .destroyAuthUser(event.value)
            .subscribe(
                (user: User) => this.messsage(user, loading),
                (error: HttpErrorResponse) =>
                    this.userService.error(error, loading, this.$destroy)
            ));
    }

    private messsage(
        user: User,
        loading: Promise<HTMLIonLoadingElement>
    ): Promise<number> {
        this.helpService.delay(() => this.modalController.dismiss(), 2500);
        return this.userService.message(user, loading, this.$destroy);
    }

    private getData(): void {
        this.config = { ...this.user };
    }
}
