import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface';

@Component({
    selector: 'app-user',
    templateUrl: 'user.page.html',
    styleUrls: ['user.page.scss'],
})
export class UserPage implements OnInit {
    public user: User;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.getUser();
    }

    public getUser(): User {
        return (this.user = this.activatedRoute.snapshot.data.user);
    }
}
