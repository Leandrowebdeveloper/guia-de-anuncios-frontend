import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interface';

@Component({
    selector: 'app-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.scss'],
})
export class StateComponent implements OnInit {
    @Input() user: User;
    public state: boolean;
    private $authState: Subscription;
    constructor(private userService: UserService) {}

    ngOnInit() {
        this.setState();
    }

    public setState(): void {
        this.state = this.user?.state;
    }

    public toggleState(): Subscription {
        this.setAuthSlug();
        return (this.$authState = this.userService
            .authState(this.user)
            .subscribe(
                (user: User) => this.success(user),
                (error: HttpErrorResponse) =>
                    this.userService.error(error, null, this.$authState)
            ));
    }

    private setAuthSlug() {
        this.user.slug = this.userService.getAuthUserSlug();
    }

    private success(user: User): void {
        this.updateState(user);
        this.userService.message(user, null, this.$authState, 350);
    }

    private updateState(user: User): void {
        this.state = user?.state;
    }
}
