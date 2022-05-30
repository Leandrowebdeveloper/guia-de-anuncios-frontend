import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

import { User } from 'src/app/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
 * @class InitService
 * @extends HttpService<User[]>
 */
export class InitService extends HttpService<User> {
  constructor(public http: HttpClient) {
    super(http, `${environment.api}api/init`);
  }

  public set setToken(token: string) {
    this.token = token;
  }

  public boot(): Observable<User> {
    return this.findAll();
  }
}
