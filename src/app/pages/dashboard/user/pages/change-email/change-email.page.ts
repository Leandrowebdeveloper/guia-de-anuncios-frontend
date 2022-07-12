import { Observable, Subject, EMPTY } from 'rxjs';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
    selector: 'app-change-email',
    templateUrl: './change-email.page.html',
    styleUrls: ['./change-email.page.scss'],
})
export class ChangeEmailPage implements OnInit {
    public location: string[];
    public error: string;
    public user$: Observable<User>;
    public error$ = new Subject<boolean>();
    private user: User;

    constructor(
        private storageService: StorageService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.getUser();
        this.changeEmail();
        this.getLocation();
    }

    public getLocation() {
        return (this.location = [
            '/painel-de-controle',
            'usuarios',
            this.userService.getAuthUserSlug(),
        ]);
    }

    private getUser() {
        this.user = this.activatedRoute.snapshot.data.changeEmail;
    }

    private changeEmail() {
        return (this.user$ = this.userService
            .emailIsValidToChange(`${this.user?.token}/${this.user?.slug}`)
            .pipe(
                tap((user: User) => this.success(user)),
                catchError((error: HttpErrorResponse) => this.setErrors(error))
            ));
    }

    private success(user: User): void {
        this.userService.setAuthUserEmail(user);
        this.storageService.setAuthUserToken(user);
    }

    private setErrors(error: HttpErrorResponse): Observable<never> {
        this.error = error?.error;
        this.error$.next(true);
        return EMPTY;
    }
}
