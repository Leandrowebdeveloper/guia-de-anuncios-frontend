import { HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, tap } from 'rxjs/operators';
import { UsersService } from './services/users.service';
import { User } from 'src/app/interface';
import { Observable, EMPTY, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../dashboard/user/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  public users$: Observable<User[]>;
  public error = new Subject<boolean>();

  public sizeSkeleton = [1,2,3,4,5,6,7,8,9,10,11,12];

  private limit = 12;
  private offset = 0;
  private page = 1;

  constructor(
    private userService: UserService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.calculatePagination();
    return this.users$ = this.usersService.index(`${this.limit}/${this.offset}`).pipe(
        tap(),
        delay(2000),
        catchError((error: HttpErrorResponse)=> {
            // console.log(error);
            this.error.next(true);
            return EMPTY;
        })
    );
  }

  private calculatePagination(): void {
    this.page += 1;
    this.offset = (this.page - 1) * this.limit;
    return;
  }

}
