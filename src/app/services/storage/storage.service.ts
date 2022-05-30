import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { LocalStorage } from 'src/app/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements LocalStorage {
  private _storage: Storage | null = null;
  private _token = new BehaviorSubject<string>(undefined);
  constructor(private storage: Storage) { }

  public async init(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set setToken(value: string) {
    this._token.next(value);
  }

  public get getToken(): string {
    return this._token.value;
  }

  public get getAsObservableToken(): Observable<string> {
    return this._token.asObservable();
  }

  public create(key: string, value: string | object): Promise<any> {
    if (typeof value === 'string') {
      return this._storage?.set(key, value);
    }
    return this._storage?.set(key, JSON.stringify(value, null, ' '));
  }

  public update(key: string, value: string | object): Promise<any> {
    if (typeof value === 'string') {
      return this._storage?.set(key, value);
    }
    return this._storage?.set(key, JSON.stringify(value, null, ' '));
  }

  public async find(key: string): Promise<any> {
    const result = await this._storage?.get(key);
    if (this.isJson(result)) {
      return JSON.parse(result);
    }
    return result;
  }

  public destroy(key: string): Promise<void> {
    return this._storage?.remove(key);
  }

  public clean(): Promise<void> {
    return this._storage?.clear();
  }

  public async isToken(): Promise<string> {
    const session = await this.getSessionStorage();
    if (session) {
      return (this.setToken = session);
    }
    return (this.setToken = await this.find('token'));
  }

  private async getSessionStorage(): Promise<string> {
    return await Promise.resolve(sessionStorage.getItem('token'))
  }

  public isJson(value: string): boolean {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  }
}
