import { HttpService } from 'src/app/services/http/http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { ActivateAccount } from 'src/app/interface';

@Injectable()

/**
 * @class ActivateAccountService
 * @extends HttpService<ActivateAccount>
 */
export class ActivateAccountService extends HttpService<ActivateAccount> {

  constructor(public http: HttpClient) {
    super(http, `${environment.api}api/activate-account`);
  }

  /**
   * @class ActivateAccountService
   * @function sendActivationToken
   * @readonly Faz uma chamada http para ativar a conta do usuário
   * @type Observable<ActivateAccount>
   * @param activate Codigo de ativação da conta
   * @returns
   */
  public sendActivationToken(activate: string): Observable<ActivateAccount> {
    return this.find(activate);
  }
}
