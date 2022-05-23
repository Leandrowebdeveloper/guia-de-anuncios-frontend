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
  public error: string; // Menssagem de error
  public activateCount$: Observable<ActivateAccount>; // Resposta da chamada http
  public error$ = new Subject<boolean>(); // Resposta caso erro

  constructor(
    private activateCountService: ActivateAccountService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.thereIsKeyForActivateCount();
  }

  /**
   * @class ActivateAccountPage
   * @function key
   * @readonly Retorna a chave de ativação do usuário
   * @type string
   * @returns string
   */
  private get key(): string {
    return this.activatedRoute.snapshot.data.activateAccount;
  }



  /**
   * @class ActivateAccountPage
   * @function thereIsKeyForActivateCount
   * @readonly Executa a chamada de ativação do usuário
   * @type Observable<ActivateAccount>
   * @returns Observable<ActivateAccount>
   */
  private thereIsKeyForActivateCount(): Observable<ActivateAccount> {
    return (this.activateCount$ = this.activateCountService
      .sendActivationToken(this.key)
      .pipe(
        catchError((error: HttpErrorResponse) => this.setErrors(error))
      ));
  }

  /**
   * @class ActivateAccountPage
   * @function setErrors
   * @readonly Executa erros HttpErrorResponse
   * @type Observable<never>
   * @param error HttpErrorResponse
   * @returns never
   */
  private setErrors(error: HttpErrorResponse): Observable<never> {
    this.error = error?.error;
    this.error$.next(true);
    return EMPTY;
  }
}
