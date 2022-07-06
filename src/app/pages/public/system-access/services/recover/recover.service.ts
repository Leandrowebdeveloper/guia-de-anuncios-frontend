import { HttpService } from 'src/app/services/http/http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/interface';
import { HelpsService } from 'src/app/services/helps/helps.service';
import { Router } from '@angular/router';

@Injectable()

export class RecoverService extends HttpService<User> {
    constructor(
        public http: HttpClient,
        private router: Router,
        private helpsService: HelpsService
    ) {
        super(http);
        this.api = `recover`;
    }

    public goToLoginPage(): number {
        return this.helpsService.delay(
            () => this.router.navigate(['/entrar']),
            2500
        );
    }
}
