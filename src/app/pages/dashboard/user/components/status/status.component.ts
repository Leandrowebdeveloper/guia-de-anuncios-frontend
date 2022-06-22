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

    public setUserStatus(user: User) {
        this.user.state = user.state;
    }

    public setStatus(): void {
        this.status = this.user.state;
    }

    public toggleState() {
        return (this.$state = this.userService.state(this.user).subscribe(
            (user: User) => this.successState(user),
            (error: HttpErrorResponse) => this.userService.error(error, this.$state)
        ));
    }

    private successState(user: User): void {
        this.setState(user);
        this.userService.messageState(user);
    }

    private setState(user: User): void {
        this.setUserStatus(user);
        this.updateStatus(user);
        this.updateUser();
    }

    private updateStatus(user: User): void {
        this.status = user.state;
    }

    private updateUser(): void {
        this.userService.user = this.user;
    }

}
