import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AttrButton } from 'src/app/components/buttons/system-access-page-buttons/interface';
import { User } from 'src/app/interface';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-name',
    templateUrl: './name.component.html',
    styleUrls: ['./name.component.scss'],
})
export class NameComponent implements OnInit {
    @Input() _csrf: string;
    @Input() firstName: string;
    @Input() lastName: string;
    @Input() slug: string;

    public attrButtonPage: AttrButton[];
    public readonly attrButton: AttrButton = {
        route: '/entrar',
        icon: 'cloud-upload',
        label: 'Salvar',
        fill: false,
        aria: 'Salvar nome e sobrenome.',
        title: 'Salvar nome e sobrenome.',
    };

    public config: object;
    private form: FormGroup;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.getData();
    }

    public importForm(event: FormGroup): FormGroup {
        return (this.form = event);
    }

    public onSubmit(event: FormGroup) {
        this.userService.updateName(event.value).subscribe(
            (user: User) => console.log(user),
            (error: HttpErrorResponse) => console.error(error)
        );
    }

    private getData() {
        this.config = {
            _csrf: this._csrf,
            firstName: this.firstName,
            lastName: this.lastName,
            slug: this.slug,
        };
    }
}
