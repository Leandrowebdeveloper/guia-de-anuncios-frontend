import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Subject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { ActivateAccountService } from './services/activate-account.service';
import { ActivateAccount } from 'src/app/interface';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.page.html',
  styleUrls: ['./activate-account.page.scss'],
})
/**
 * @class ActivateAccountPage
 * @implements OnInit
 */
export class ActivateAccountPage implements OnInit {
  public error: string;
  public activateCount$: Observable<ActivateAccount>;
  public error$ = new Subject<boolean>();
  constructor(
    private activateCountService: ActivateAccountService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.thereIsKeyForActivateCount();
  }

  private get key(): string {
    return this.activatedRoute.snapshot.data.activateAccount;
  }

  private thereIsKeyForActivateCount(): Observable<ActivateAccount> {
    return (this.activateCount$ = this.activateCountService
      .sendActivationToken(this.key)
      .pipe(
        catchError((error: HttpErrorResponse) => this.setErrors(error))
      ));
  }

  private setErrors(error: HttpErrorResponse): Observable<never> {
    this.error = error?.error;
    this.error$.next(true);
    return EMPTY;
  }
}
