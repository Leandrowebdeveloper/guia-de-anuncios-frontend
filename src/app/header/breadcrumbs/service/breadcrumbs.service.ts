import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from 'src/app/interface';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private _breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  private _url: string;
  public readonly breadcrumbs$ = this._breadcrumbs.asObservable();
  constructor(private router: Router) {
    this.init();
  }

  private set breadcrumbs(value: Breadcrumb[]) {
    this._breadcrumbs.next(value);
  }

  private init(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((activeRoute: NavigationEnd) => this.start(activeRoute));
  }

  private start(activeRoute: NavigationEnd) {
    if (activeRoute.url) {
      this.url = activeRoute.url;
      this.createBreadcrumbs();
    }
  }

  private get url(): string {
    return (this._url = this.router.url);
  }

  private set url(value: string) {
    this._url = value;
  }

  private get convertUrlToArray(): string[] {
    const size = this.urlSize;
    return this.url.split(/[\/]/g).splice(1, size);
  }

  private get urlSize() {
    return this.url.length - 1;
  }

  private get convertUrlSlugToPhrase(): string[] {
    const url = this.convertUrlToArray.map((item: string) =>
      item.replace(/[-]/g, ' ')
    );
    return url;
  }

  private createBreadcrumbs(): void {
    const breadcrumb: Breadcrumb[] = [];
    this.convertUrlSlugToPhrase.forEach((item: string, index: number) =>
      breadcrumb.push({
        label: this.filterLabel(item),
        link: this.buildLink(index),
      })
    );
    this.breadcrumbs = breadcrumb;
  }

  private filterLabel(label: string): string {
    switch (label) {
      case 'usuarios':
        return 'usuários';
      case 'anuncios':
        return 'anúncios';
      default:
          return label;
    }
  }

  private buildLink(index: number): string {
    switch (index) {
      case 1:
        return this.url;
      case 2:
        return `/${this.convertUrlToArray[index]}`;
      default:
        return `/${this.convertUrlToArray[index]}`;
    }
  }
}
