import { HttpService } from 'src/app/services/http/http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User } from 'src/app/interface';

@Injectable()

/**
 * @class LoginService
 * @extends HttpService<User>
 */
export class LoginService extends HttpService<User> {

  constructor(public http: HttpClient) {
    super(http, `${environment.api}api/login`);
  }
}
