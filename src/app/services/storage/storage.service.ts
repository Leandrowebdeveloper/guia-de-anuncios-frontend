import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { LocalStorage } from 'src/app/interface';

@Injectable({
  providedIn: 'root',
})
/**
 * @class StorageService
 * @implements LocalStorage
 * @readonly Esta classe cria um banco de dados browser
 */
export class StorageService implements LocalStorage {
  private _storage: Storage | null = null;
  private _token = new BehaviorSubject<string>(undefined);
  constructor(private storage: Storage) {
    this.init();
  }

  /**
   * @class AuthService
   * @function set setToken
   * @type string
   * @readonly Setar token
   * @param value string
   * @returns void
   */
  public set setToken(value: string) {
    this._token.next(value);
  }

  /**
   * @class AuthService
   * @function get getToken
   * @type string
   * @readonly Pegar token
   * @returns string
   */
  public get getToken() {
    return this._token.value;
  }

  /**
   * @class StorageService
   * @function init
   * @type Promise<void>
   * @readonly Inicializa o armazenamanto local cria o banco de dados
   * @returns void
   */
  private async init(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;
    this.isToken();
  }

  /**
   * @class StorageService
   * @function create
   * @type Promise<void>
   * @readonly Insere dados armazenados localmente
   * @param key string
   * @param value string | object
   * @returns any
   */
  public create(key: string, value: string | object): Promise<any> {
    if (typeof value === 'string') {
      return this._storage?.set(key, value);
    }
    return this._storage?.set(key, JSON.stringify(value, null, ' '));
  }

  /**
   * @class StorageService
   * @function update
   * @type Promise<void>
   * @readonly Artualiza dados
   * @param key string
   * @param value string | object
   * @returns any
   */

  public update(key: string, value: string | object): Promise<any> {
    if (typeof value === 'string') {
      return this._storage?.set(key, value);
    }
    return this._storage?.set(key, JSON.stringify(value, null, ' '));
  }

  /**
   * @class StorageService
   * @function find
   * @type Promise<void>
   * @readonly Seleciona dados armazenados
   * @param key string
   * @returns Promise<any>
   */
  public async find(key: string): Promise<any> {
    const result = await this._storage?.get(key);
    if (this.isJson(result)) {
      return JSON.parse(result);
    }
    return result;
  }

  /**
   * @class StorageService
   * @function destroy
   * @type Promise<void>
   * @readonly Exclui um dados expecífico armazenados localmente
   * @param key string
   * @returns
   */
  public destroy(key: string): Promise<void> {
    return this._storage?.remove(key);
  }

  /**
   * @class StorageService
   * @function clean
   * @type Promise<void>
   * @readonly Exclui todos os dados armazenados localmente
   * @returns void
   */
  public clean(): Promise<void> {
    return this._storage?.clear();
  }


  /**
   * @class StorageService
   * @function isToken
   * @type string
   * @readonly Verifica se existe token
   * @returns string | ''
   */
   private async isToken(): Promise<string> {
   return this.find('token').then((token: string) => (this.setToken = token));    
  }

  /**
   * @class StorageService
   * @function isJson
   * @type boolean
   * @readonly Verifica se o valor e um jsom
   * @param value string
   * @returns boolean
   */
  public isJson(value: string): boolean {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  }
}
