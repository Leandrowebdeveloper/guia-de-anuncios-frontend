import { EventEmitter, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from 'src/app/interface';

@Injectable({
    providedIn: 'root',
})
export class BreadcrumbsService {
    private breadcrumbEvent = new EventEmitter<string>(null);
    private breadcrumb = new BehaviorSubject<Breadcrumb[]>([]);
    private readonly breadcrumb$ = this.breadcrumb.asObservable();

    constructor(private router: Router) {
        this.init();
    }

    public get breadcrumbs$() {
        return this.breadcrumb$;
    }

    public getEvent(): Observable<string> {
       return this.breadcrumbEvent.asObservable();
    }

    public setEvent(value: string): void {
        this.breadcrumbEvent.emit(value);
    }

    public update(url: string): void {
       return this.createBreadcrumbs(url);
    }

    private convertUrlToArray(url: string): string[] {
        const size = this.urlSize(url);
        return url.split(/[\/]/g).splice(1, size);
    }

    private urlSize(url: string): number {
        return url.length - 1;
    }

    private breadcrumbs(value: Breadcrumb[]): void {
        this.breadcrumb.next(value);
    }

    private convertUrlSlugToPhrase(url: string): string[] {
        const result = this.convertUrlToArray(url).map((item: string) =>
            item.replace(/[-]/g, ' ')
        );
        return this.convertSlugEndTitle(result);
    }

    private init(): void {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((activeRoute: NavigationEnd) => this.start(activeRoute));
    }

    private start(activeRoute: NavigationEnd): void {
        if (activeRoute instanceof NavigationEnd) {
            this.createBreadcrumbs(activeRoute.url);
        }
    }

    private convertSlugEndTitle(slug: string[]): string[] {
        const result = slug
            .map(this.filterSlug())
            .filter((item) => item !== undefined);
        return this.newSlug(slug, result);
    }

    private newSlug(slug: string[], result: string[]): string[] {
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

    private createBreadcrumbs(url: string): void {
        const breadcrumb: Breadcrumb[] = [];
        this.convertUrlSlugToPhrase(url).forEach(
            (item: string, index: number) =>
                breadcrumb.push({
                    label: this.filterLabel(item),
                    link: this.buildLink(url, index),
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

    private buildLink(url: string, index: number): string {
        switch (index) {
            case 1:
                return url;
            case 2:
                return url;
            default:
                return `/${this.convertUrlToArray(url)[index]}`;
        }
    }
}
