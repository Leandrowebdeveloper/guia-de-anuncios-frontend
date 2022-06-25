import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interface';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
    @Input() user: User;
    public status: boolean;
    private $state: Subscription;
    constructor(private userService: UserService) {}

    ngOnInit() {
        this.setStatus();
    }

    public setStatus(): void {
        this.status = this.user.state;
    }

    public toggleState():  Subscription {
        this.setSlug();
        return (this.$state = this.userService.state(this.user).subscribe(
            (user: User) => this.success(user),
            (error: HttpErrorResponse) => this.userService.error(error, this.$state)
        ));
    }

    private setSlug() {
        this.user.slug = this.userService.getSlug();
    }

    private success(user: User): void {
        this.updateStatus(user);
        this.userService.message(user);
    }

    private updateStatus(user: User): void {
        this.status = user.state;
    }

}
