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

  public set csrf(csrf: string) {
    this.httpOptions.headers = this.httpOptions.headers.set('CSRF-Token', csrf);
  }

  protected set token(token: string) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      `Bearer ${token || ''}`
    );
  }

  public requirement(token?: string): Observable<T> {
    return this.http
      .get<T>(`${this.api}/requirement/${token || ''}`, this.httpOptions)
      .pipe(tap((e: T) => console.log('requirement', e)));
  }

  public index(): Observable<T> {
    return this.http
      .get<T>(`${this.api}/`, this.httpOptions)
      .pipe(tap((e: T) => console.log('index', e)));
  }

  public findAll(url?: string): Observable<T> {
    return this.http
      .get<T>(`${this.api}/${url || ''}`, this.httpOptions)
      .pipe(tap((e: T) => console.log('findAll', e)));
  }

  public create(data: T, url?: string): Observable<T> {
    return this.http
      .post<T>(`${this.api}/${url || ''}`, data, this.httpOptions)
      .pipe(tap((e: T) => console.log('create', e)));
  }

  public find(id: string | number): Observable<T> {
    return this.http
      .get<T>(`${this.api}/${id}`, this.httpOptions)
      .pipe(tap((e: T) => console.log('find', e)));
  }

  public update(data: T): Observable<T | number[]> {
    return this.http
      .put<T | []>(`${this.api}/`, data, this.httpOptions)
      .pipe(tap((e: T | number[]) => console.log('update', e)));
  }

  public patch(data: T, url?: string): Observable<T | number[]> {
    return this.http
      .patch<T>(`${this.api}/${url || ''}`, data, this.httpOptions)
      .pipe(tap((e: T | number[]) => console.log('patch', e)));
  }

  public destroy(data: T): Observable<T | number> {
    return this.http.delete<T | number>(`${this.api}`, {
      headers: this.httpOptions.headers,
      body: data,
    });
  }

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
