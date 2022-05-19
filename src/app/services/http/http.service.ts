import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Http } from 'src/app/interface';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 * @class HttpService
 * @implements Http
 */
export class HttpService<T> implements Http<T> {
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'CSRF-Token': '',
      Authorization: `Bearer `,
    }),
  };

  constructor(
    protected http: HttpClient,
    @Inject(String) protected api: string
  ) {}

  /**
   * @class HttpService
   * @function headers
   * @type string
   * @readonly Seta o valor csrf para o cabeçalho
   * @param csrf string
   * @returns void
   */
  public set csrf(csrf: string) {
    this.httpOptions.headers = this.httpOptions.headers.set('CSRF-Token', csrf);
  }

  /**
   * @class HttpService
   * @function token
   * @type string
   * @readonly Seta o valor auth token para o cabeçalho
   * @param token string
   * @returns void
   */
  protected set token(token: string) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      `Bearer ${token || ''}`
    );
  }

  /**
   * @class HttpService
   * @function requirement
   * @type Observable<T>
   * @readonly Carrega a interface e o CSRF
   * @returns [] | {}
   */
  public requirement(): Observable<T> {
    return this.http
      .get<T>(`${this.api}/requirement`, this.httpOptions)
      .pipe(tap((e: T) => console.log('requirement', e)));
  }

  /**
   * @class HttpService
   * @function findAll
   * @type Observable<T[] | T>
   * @readonly Seleciona todos os dados da tabela
   * @param url ex: user/id
   * @returns [] | {}
   */
  public findAll(url?: string): Observable<T> {
    return this.http
      .get<T>(`${this.api}/${url || ''}`, this.httpOptions)
      .pipe(tap((e: T) => console.log('findAll', e)));
  }

  /**
   * @class HttpService
   * @function create
   * @type Observable<T>
   * @readonly Insere dados em uma tabela
   * @param data object {}
   * @param url string
   * @returns object {}
   */
  public create(data: T, url?: string): Observable<T> {
    return this.http
      .post<T>(`${this.api}/${url || ''}`, data, this.httpOptions)
      .pipe(tap((e: T) => console.log('create', e)));
  }

  /**
   * @class HttpService
   * @function find
   * @type Observable<T>
   * @readonly Seleciona uma linha da tabela
   * @param id string ou number
   * @returns object {}
   */
  public find(id: string | number): Observable<T> {
    return this.http
      .get<T>(`${this.api}/${id}`, this.httpOptions)
      .pipe(tap((e: T) => console.log('find', e)));
  }

  /**
   * @class HttpService
   * @function update
   * @type Observable<T | number[]>
   * @readonly Atualiza linhas da tabela
   * @param data object {}
   * @returns {} | []
   */
  public update(data: T): Observable<T | number[]> {
    return this.http
      .put<T | []>(`${this.api}/`, data, this.httpOptions)
      .pipe(tap((e: T | number[]) => console.log('update', e)));
  }

  /**
   * @class HttpService
   * @function patch
   * @type Observable<T | number[]>
   * @readonly Atualiza parcialmente campos de uma tabela
   * @param data {}
   * @param url string
   * @returns {} | []
   */
  public patch(data: T, url?: string): Observable<T | number[]> {
    return this.http
      .patch<T>(`${this.api}/${url || ''}`, data, this.httpOptions)
      .pipe(tap((e: T | number[]) => console.log('patch', e)));
  }

  /**
   * @class HttpService
   * @function destroy
   * @type Observable<T>
   * @readonly  Exclui linhas da tabela
   * @param data {}
   * @returns number
   */
  public destroy(data: T): Observable<T | number> {
    return this.http.delete<T | number>(`${this.api}`, {
      headers: this.httpOptions.headers,
      body: data,
    });
  }

  /**
   * @class HttpService
   * @function upload
   * @type Observable<any>
   * @readonly Transfere arquivo para o servidor
   * @param url rota
   * @param data {}
   * @param file arquivo jpg, jpeg, png
   * @returns
   */
  public upload(url: string, data: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('id', data?.slug);
    formData.append('_csrf', data?.csrfToken);
    formData.append('filename', file, file.name);

    const request = new HttpRequest<any>(
      'POST',
      `${this.api}/${url}`,
      formData,
      {
        headers: new HttpHeaders({
          'CSRF-Token': this.httpOptions.headers.get('CSRF-Token'),
          Authorization: this.httpOptions.headers.get('Authorization'),
        }),
        reportProgress: true,
        responseType: /*'arraybuffer'  'blob'  'text' */ 'json',
      }
    );
    return this.http.request<T[]>(request);
  }
}
