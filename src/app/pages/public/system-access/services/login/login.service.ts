import { environment } from '../../../../../../environments/environment';
import { User } from 'src/app/interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class LoginService extends HttpService<User> {
    private _stayConnected: boolean;
    constructor(public http: HttpClient, private authService: AuthService) {
        super(http, `${environment.api}api/login`);
    }

    public get stayConnected() {
        return this._stayConnected;
    }

    public set stayConnected(value: boolean) {
        this._stayConnected = value;
    }

    public storesTokenDatabaseOrSession(user: User): void {
        if (this.stayConnected) {
            return this.setUserAndTokenInDatabase(user);
        }
        return this.setUserAndTokenInSession(user);
    }

    private setTokenSession(user: User): void {
        return sessionStorage.setItem('token', user.token);
    }

    private async setTokenDatabase(user: User): Promise<void> {
        return await this.authService.setAuthToken(user);
    }

    private setAuthUser(user: User): User {
        return (this.authService.setUserAndAuthentication = user);
    }

    private setUserAndTokenInSession(user: User): void {
        this.setAuthUser(user);
        this.setTokenSession(user);
    }

    private setUserAndTokenInDatabase(user: User): void {
        this.setAuthUser(user);
        this.setTokenDatabase(user);
    }
}
