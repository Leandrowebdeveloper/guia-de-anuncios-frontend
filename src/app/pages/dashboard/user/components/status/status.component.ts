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
    private $authState: Subscription;
    constructor(private userService: UserService) {}

    ngOnInit() {
        this.setStatus();
    }

    public setStatus(): void {
        this.status = this.user.authState;
    }

    public toggleState():  Subscription {
        this.setAuthSlug();
        return (this.$authState = this.userService.authState(this.user).subscribe(
            (user: User) => this.success(user),
            (error: HttpErrorResponse) => this.userService.error(error, this.$authState)
        ));
    }

    private setAuthSlug() {
        this.user.slug = this.userService.getAuthUserSlug();
    }

    private success(user: User): void {
        this.updateStatus(user);
        this.userService.message(user);
    }

    private updateStatus(user: User): void {
        this.status = user.authState;
    }

}
