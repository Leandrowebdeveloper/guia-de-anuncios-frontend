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
    private readonly _breadcrumbs$ = this._breadcrumbs.asObservable();

    private _url: string;
    constructor(private router: Router) {
        this.init();
    }

    public get breadcrumbs$() {
        return this._breadcrumbs$;
    }

    private get url(): string {
        return (this._url = this.router.url);
    }

    private set url(value: string) {
        this._url = value;
    }

    private convertUrlToArray(): string[] {
        const size = this.urlSize();
        return this.url.split(/[\/]/g).splice(1, size);
    }

    private urlSize() {
        return this.url.length - 1;
    }

    private breadcrumbs(value: Breadcrumb[]) {
        this._breadcrumbs.next(value);
    }

    private convertUrlSlugToPhrase(): string[] {
        const url = this.convertUrlToArray().map((item: string) =>
            item.replace(/[-]/g, ' ')
        );
        return this.convertSlugEndTitle(url);
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

    private convertSlugEndTitle(slug: string[]) {
        const result = slug
            .map(this.filterSlug())
            .filter((item) => item !== undefined);
        return this.newSlug(slug, result);
    }

    private newSlug(slug: string[], result: string[]) {
        if (result.length > 0) {
            slug.pop();
            slug.push(result[0]);
        }
        return slug;
    }

    private filterSlug(): (
        value: string,
        index: number,
        array: string[]
    ) => string {
        return (item, i) => {
            if (i > 1) {
                const rejected = item.split(' ').pop();
                return item.replace(rejected, '').trim();
            }
        };
    }

    private createBreadcrumbs(): void {
        const breadcrumb: Breadcrumb[] = [];
        this.convertUrlSlugToPhrase().forEach((item: string, index: number) =>
            breadcrumb.push({
                label: this.filterLabel(item),
                link: this.buildLink(index),
            })
        );
        this.breadcrumbs(breadcrumb);
    }

    private filterLabel(label: string): string {
        switch (label) {
            case 'usuarios':
                return 'usuários';
            case 'anuncios':
                return 'anúncios';
            case 'inicio':
                return 'Início';
            case 'erro-de-pagina-404':
                return 'Erro de Página 404';
            default:
                return label;
        }
    }

    private buildLink(index: number): string {
        switch (index) {
            case 1:
                return this.url;
            case 2:
                return this.url;
            default:
                return `/${this.convertUrlToArray[index]}`;
        }
    }
}
