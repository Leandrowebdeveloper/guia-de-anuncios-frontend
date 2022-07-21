import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';

import { User } from 'src/app/interface';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root',
})
/**
 * @class InitService
 * @extends HttpService<User[]>
 */
export class InitService extends HttpService<User> {
    constructor(public http: HttpClient, public storageService: StorageService) {
        super(http, storageService);
        this.api = `init`;
    }

    public boot(): Observable<User> {
        return this.findAll();
    }
}
