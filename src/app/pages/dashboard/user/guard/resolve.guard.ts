import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { User } from 'src/app/interface';
import { UserService } from 'src/app/pages/dashboard/user/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserResolver implements Resolve<User> {
    constructor(private router: Router, private userService: UserService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        const id = route.params?.id;
        return this.userService.requirement(id).pipe(
            catchError((error: HttpErrorResponse): Observable<never> => {
                console.log(error);
                this.router.navigate(['/erro']);
                return EMPTY;
            })
        );
    }
}
