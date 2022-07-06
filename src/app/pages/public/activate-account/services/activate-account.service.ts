import { HttpService } from 'src/app/services/http/http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ActivateAccount } from 'src/app/interface';

@Injectable()
export class ActivateAccountService extends HttpService<ActivateAccount> {
  constructor(public http: HttpClient) {
    super(http);
    this.api = `activate-account`;
  }

  public sendActivationToken(activate: string): Observable<ActivateAccount> {
    return this.find(activate);
  }
}
