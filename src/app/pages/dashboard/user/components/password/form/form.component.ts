import { Subscription } from 'rxjs';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AttrButton } from 'src/app/components/buttons/system-access-page-buttons/interface';
import { User } from 'src/app/interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormPasswordComponent implements OnInit {
    @Input() user: User;

    public attrButtonPage: AttrButton[];
    public readonly attrButton: AttrButton = {
        route: '/new-password',
        icon: 'cloud-upload',
        label: 'Salvar',
        fill: false,
        aria: 'Salvar senha.',
        title: 'Salvar senha.',
    };

    public config: object;
    private form: FormGroup;
    private $name: Subscription;
    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.getData();
    }

    public importForm(event: FormGroup): FormGroup {
        return (this.form = event);
    }

    public onSubmit(event: FormGroup): Subscription {
        event.value.slug = this.userService.getSlug();
        return (this.$name = this.userService.updateName(event.value).subscribe(
            (user: User) => this.userService.message(user),
            (error: HttpErrorResponse) =>
                this.userService.error(error, this.$name)
        ));
    }

    private getData(): void {
        this.config = { ...this.user };
    }
}
