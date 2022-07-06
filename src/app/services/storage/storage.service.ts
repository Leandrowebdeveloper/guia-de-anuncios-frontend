import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocalStorage, User } from 'src/app/interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StorageService implements LocalStorage {
    private $storage: Storage | null = null;
    private $token = new BehaviorSubject<string>(undefined);
    constructor(private storage: Storage) { }

    public get getAsObservableToken(): Observable<string> {
        return this.$token.asObservable();
    }

    public get getToken(): string {
        return this.$token.value;
    }

    public set setAuthToken(value: string) {
        this.$token.next(value);
    }

    public async init(): Promise<void> {
        const storage = await this.storage.create();
        this.$storage = storage;
    }

    public create(key: string, value: string | object): Promise<any> {
        if (typeof value === 'string') {
            return this.$storage?.set(key, value);
        }
        return this.$storage?.set(key, JSON.stringify(value, null, ' '));
    }

    public update(key: string, value: string | object): Promise<any> {
        if (typeof value === 'string') {
            return this.$storage?.set(key, value);
        }
        return this.$storage?.set(key, JSON.stringify(value, null, ' '));
    }

    public async find(key: string): Promise<any> {
        const result = await this.$storage?.get(key);
        if (this.isJson(result)) {
            return JSON.parse(result);
        }
        return result;
    }

    public destroy(key: string): Promise<void> {
        return this.$storage?.remove(key);
    }

    public clean(): Promise<void> {
        return this.$storage?.clear();
    }


    public async isToken(): Promise<string> {
        const session = await this.getSessionStorage();
        if (session) {
            return (this.setAuthToken = session);
        }
        return (this.setAuthToken = await this.find('token'));
    }

    public isJson(value: string): boolean {
        try {
            JSON.parse(value);
        } catch (e) {
            return false;
        }
        return true;
    }

    public async setAuthUserToken(user: User): Promise<void> {
        return await this.create('token', user?.token);
    }

    private async getSessionStorage(): Promise<string> {
        return await Promise.resolve(sessionStorage.getItem('token'));
    }
}
