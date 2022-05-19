import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

import { Init } from 'src/app/interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
/**
 * @class InitService
 * @extends HttpService<Init[]>
 */
export class InitService extends HttpService<Init[]> {

  constructor(public http: HttpClient) {
    super(http, `${environment.api}api/users`);
  }

  /**
   * @class InitService
   * @function setToken
   * @type string
   * @readonly Seta o valor do token jwt
   * @returns void
   */
  public set setToken(token: string) {
    this.token = token;
  }

  /**
   * @class InitService
   * @function boot
   * @type Observable<Init[]>
   * @readonly Inicializa uma chamada de dados no servidor
   * @returns Observable<Init[]>
   */
  public boot(): Observable<Init[]> {
    return this.findAll();
  }


}
